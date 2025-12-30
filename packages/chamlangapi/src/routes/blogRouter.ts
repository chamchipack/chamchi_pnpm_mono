// routes/articles.ts
import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Article } from '../schemas/Blog';

const router = Router();

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * GET /articles
 * ?page=1&limit=20&query=키워드&category=카테고리&userId=작성자ID
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    // page/limit 숫자 변환
    const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(req.query.limit ?? '20'), 10) || 20),
    );
    const skip = (page - 1) * limit;

    const field = req.query.field;

    const selectFields = typeof field === 'string' ? field.split(',') : [];

    // 필터 파라미터
    const query = String((req.query as any)?.query ?? '').trim();
    const category = String((req.query as any)?.category ?? '').trim();
    const userId = String((req.query as any)?.userId ?? '').trim();

    const searchQuery: any = {};

    // 카테고리 필터
    // if (category) {
    searchQuery.category = 'japanese';
    // }
    // 작성자 필터
    if (userId) {
      searchQuery.userId = userId;
    }
    // 제목/본문/요약 통합검색
    if (query) {
      const rx = new RegExp(escapeRegex(query), 'i');
      searchQuery.$or = [
        { markdown_title: { $regex: rx } },
        { markdown_contents: { $regex: rx } },
        { summary: { $regex: rx } },
      ];
    }

    const [items, totalCount] = await Promise.all([
      Article.find(searchQuery)
        .sort({ createdAt: -1 }) // 최신순
        .skip(skip)
        .limit(limit)
        .select(selectFields)
        .lean(),
      Article.countDocuments(searchQuery),
    ]);

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

/**
 * GET /articles/:id
 * 상세 조회
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ObjectId 유효성 체크
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid id' });
      return;
    }

    const article = await Article.findById(id).lean();

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.status(200).json({
      message: 'success',
      data: article,
    });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
});

export default router;
