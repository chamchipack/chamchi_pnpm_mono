// routes/vocabularyRouter.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Vocabulary } from '../schemas/Vocabulary'; // 아까 만든 Vocabulary 모델
import { Word } from '../schemas/Word';

const router = express.Router();

/** =========================
 *  단어장 리스트 (GET)
 *  GET /api/vocabulary/:userId
 * ========================= */
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const vocabs = await Vocabulary.find({ userId })
      .populate('words')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ message: 'success', data: vocabs });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
});

/** =========================
 *  단어장 추가 (POST)
 *  POST /api/vocabulary/:userId
 * ========================= */
router.post('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { title, description, color, tags } = req.body;

    const vocab = await Vocabulary.create({
      userId,
      title,
      description: description ?? '',
      color: color ?? '#0A84FF',
      tags: tags ?? [],
      system: false,
      words: [],
    });

    res.status(201).json({ message: 'success', data: vocab });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
});

/** =========================
 *  단어장 이름 수정 (PATCH)
 *  PATCH /api/vocabulary/:userId/:vocabId
 * ========================= */
router.patch(
  '/:userId/:vocabId',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId, vocabId } = req.params;
      const { title } = req.body;

      const vocab = await Vocabulary.findOneAndUpdate(
        { _id: vocabId, userId },
        { $set: { title } },
        { new: true },
      );

      if (!vocab) {
        return res.status(404).json({ message: 'Vocabulary not found' });
      }

      res.status(200).json({ message: 'success', data: vocab });
    } catch (error) {
      res.status(500).json({ message: 'error', error });
    }
  },
);

/** =========================
 *  단어 추가/제거 (PATCH)
 *  PATCH /api/vocabulary/:userId/:vocabId/words
 *  body: { wordId: string, action: "add" | "remove" }
 * ========================= */
router.patch(
  '/:userId/:vocabId/words',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId, vocabId } = req.params;
      const { wordId, action } = req.body;

      if (!mongoose.isValidObjectId(wordId)) {
        return res.status(400).json({ message: 'Invalid wordId' });
      }

      const update =
        action === 'add'
          ? { $addToSet: { words: wordId } }
          : { $pull: { words: wordId } };

      const vocab = await Vocabulary.findOneAndUpdate(
        { _id: vocabId, userId },
        update,
        { new: true },
      ).populate('words');

      if (!vocab) {
        return res.status(404).json({ message: 'Vocabulary not found' });
      }

      res.status(200).json({ message: 'success', data: vocab });
    } catch (error) {
      res.status(500).json({ message: 'error', error });
    }
  },
);

/** =========================
 *  단어 외움 표시 (PATCH)
 *  PATCH /api/vocabulary/:userId/:vocabId/memorize
 *  body: { wordId: string, memorized: boolean }
 * ========================= */
router.patch(
  '/:userId/:vocabId/memorize',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId, vocabId } = req.params;
      const { wordId, memorized } = req.body;

      if (!mongoose.isValidObjectId(wordId)) {
        return res.status(400).json({ message: 'Invalid wordId' });
      }

      // memorizedWords 배열을 Vocabulary 스키마에 따로 추가해놔야 함
      const update = memorized
        ? { $addToSet: { memorizedWords: wordId } }
        : { $pull: { memorizedWords: wordId } };

      const vocab = await Vocabulary.findOneAndUpdate(
        { _id: vocabId, userId },
        update,
        { new: true },
      );

      if (!vocab) {
        return res.status(404).json({ message: 'Vocabulary not found' });
      }

      res.status(200).json({ message: 'success', data: vocab });
    } catch (error) {
      res.status(500).json({ message: 'error', error });
    }
  },
);

/** =========================
 *  단어장 삭제 (DELETE)
 *  DELETE /api/vocabulary/:userId/:vocabId
 * ========================= */
router.delete(
  '/:userId/:vocabId',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId, vocabId } = req.params;

      const deleted = await Vocabulary.findOneAndDelete({
        _id: vocabId,
        userId,
      });

      if (!deleted) {
        return res.status(404).json({ message: 'Vocabulary not found' });
      }

      res.status(200).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({ message: 'error', error });
    }
  },
);

export default router;
