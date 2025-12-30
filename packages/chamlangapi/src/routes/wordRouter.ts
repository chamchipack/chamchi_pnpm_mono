// routes/words.ts
import express, { Request, Response } from 'express';
import { AdjWord, NounWord, VerbWord, Word } from '../schemas/Word';
import mongoose from 'mongoose';
import { withRetryTransaction } from '../utils/withRetryTransaction';
import { Example } from '../schemas/Example';

const router = express.Router();

const JLPT_SET = new Set(['N1', 'N2', 'N3', 'N4', 'N5']);
const TYPE_SET = new Set(['verb', 'noun', 'adj', 'adv']);

// 단어 리스트
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    // page/limit은 문자열로 들어오므로 숫자 변환
    const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(req.query.limit ?? '5'), 10) || 5),
    );
    const skip = (page - 1) * limit;

    // 필터 파라미터
    const query = String((req.query as any)?.query ?? '').trim();
    const jlpt = String((req.query as any)?.jlpt ?? '')
      .trim()
      .toUpperCase();
    const type = String((req.query as any)?.type ?? '')
      .trim()
      .toLowerCase();

    const searchQuery: any = {};

    // jlpt 필터
    if (jlpt && JLPT_SET.has(jlpt)) {
      searchQuery.jlpt = jlpt;
    }

    // type 필터
    if (type && TYPE_SET.has(type)) {
      searchQuery.type = type;
    }

    // jp/kana/ro 전역 검색
    if (query) {
      const rx = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      searchQuery.$or = [{ jp: rx }, { kana: rx }, { ro: rx }];
      searchQuery.$or = [
        { jp: rx },
        { kana: rx },
        { ro: rx },
        { 'senses.meaning': rx },
        { 'senses.notes': rx },
        { 'senses.tags': rx },
      ];
    }

    const items = await Word.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await Word.countDocuments(searchQuery);

    res.status(200).json({
      message: 'success',
      data: {
        items,
        totalCount,
        page,
        limit,
        pageCount: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ObjectId 유효성 체크(선택)
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid id' });
      return;
    }

    const word = (await Word.findById(id).lean()) as any;

    if (!word) {
      res.status(404).json({ message: 'Word not found' });
      return;
    }

    const examples = await Example.find({ wordIds: word._id })
      .populate('wordIds', '-wordIds') // Word 컬렉션에서 jp, kana, ro만 가져오기
      .lean();

    // _id -> id로 매핑하고 필요 없는 필드 제거
    const normalizedExamples = examples.map((ex) => ({
      id: String(ex._id),
      jp: ex.jp,
      tokens: ex.tokens ?? [],
      ko: ex.ko,
      ro: ex.ro,
    }));

    // word + examples 결합해서 반환
    res.status(200).json({
      message: 'success',
      data: {
        ...word,
        examples: normalizedExamples,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
});

// 문자열/객체 모두 허용
const asJSON = <T = any>(v: any, fallback: T): T => {
  if (typeof v === 'string') {
    try {
      return JSON.parse(v) as T;
    } catch {
      return fallback;
    }
  }
  return v ?? fallback;
};

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const run = async () => {
    try {
      const { type, jp, kana, ro, jlpt, exception } = req.body;

      const meta = asJSON(req.body.meta, undefined);
      const senses = asJSON(req.body.senses, undefined);
      const examples = asJSON(req.body.examples, undefined);

      // ✅ 최소 필수값만 체크
      if (!type || !jp || !kana || !ro || !jlpt || !meta) {
        await session.abortTransaction();
        res
          .status(400)
          .json({ message: 'type, jp, kana, ro, jlpt, meta는 필수입니다.' });
        return;
      }

      // payload 구성 (최소만)
      const payload: any = {
        language: 'japanese',
        type,
        jp,
        kana,
        ro,
        jlpt,
        exception: typeof exception === 'boolean' ? exception : undefined,
        senses, // 없으면 undefined로 저장 안됨
        examples,
        meta,
      };

      let created: any;

      // type별 discriminator에 저장
      switch (type) {
        case 'verb':
          [created] = await VerbWord.create([payload], { session });
          break;
        case 'adj':
          [created] = await AdjWord.create([payload], { session });
          break;
        case 'noun':
          [created] = await NounWord.create([payload], { session });
          break;
        default:
          // 지원하지 않는 타입은 베이스에 저장 시도 (원치 않으면 400 반환)
          [created] = await Word.create([payload], { session });
          break;
      }

      await session.commitTransaction();
      res.status(201).json({ message: 'success', data: created });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: 'error', error });
    }
  };

  await withRetryTransaction(session, run);
  session.endSession();
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const run = async () => {
    try {
      const { id } = req.params;

      // 존재 확인
      const existing = await Word.findById(id).session(session);
      if (!existing) {
        await session.abortTransaction();
        res.status(404).json({ message: 'not_found' });
        return;
      }

      const {
        type, // 불변
        jp,
        kana,
        ro,
        jlpt,
        exception,
      } = req.body;

      // JSON 가능 필드
      const meta = asJSON(req.body.meta, undefined);
      const senses = asJSON(req.body.senses, undefined);
      const examples = asJSON(req.body.examples, undefined);

      // type 불변 체크
      if (typeof type === 'string' && type !== existing.type) {
        await session.abortTransaction();
        res.status(400).json({ message: 'type_is_immutable' });
        return;
      }

      // 부분 업데이트 셋
      const $set: Record<string, any> = {};

      if (typeof jp === 'string') $set.jp = jp.trim();
      if (typeof kana === 'string') $set.kana = kana.trim();
      if (typeof ro === 'string') $set.ro = ro.trim();
      if (typeof jlpt === 'string') $set.jlpt = jlpt.toUpperCase();

      if (typeof exception === 'boolean') $set.exception = exception;
      if (meta !== undefined) $set.meta = meta; // 전체 교체
      if (senses !== undefined) $set.senses = senses; // 전체 교체
      if (examples !== undefined) $set.examples = examples; // 전체 교체

      // 아무것도 바꿀 게 없으면 그대로 반환
      if (Object.keys($set).length === 0) {
        await session.commitTransaction();
        res.status(200).json({ message: 'noop', data: existing });
        return;
      }

      const updated = await Word.findByIdAndUpdate(
        id,
        { $set },
        { new: true, session, runValidators: true, lean: true },
      );

      await session.commitTransaction();
      res.status(200).json({ message: 'success', data: updated });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: 'error', error });
    }
  };

  await withRetryTransaction(session, run);
  session.endSession();
});

export default router;
