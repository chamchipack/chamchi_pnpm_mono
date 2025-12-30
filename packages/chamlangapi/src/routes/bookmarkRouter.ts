// routes/bookmarks.ts
import express, { Request, Response } from 'express';
import { Bookmark } from '../schemas/Bookmark'; // 방금 만든 Bookmark 스키마 import
import mongoose from 'mongoose';
import { withRetryTransaction } from '../utils/withRetryTransaction';

const router = express.Router();

const ALLOWED_TYPES = new Set(['word', 'blog', 'example']);

router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { type } = req.query as { type?: string };

    // userId 검증
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      res.status(400).json({ message: 'invalid userId' });
      return;
    }

    // type 검증 (옵션)
    if (type && !ALLOWED_TYPES.has(type)) {
      res
        .status(400)
        .json({ message: 'invalid type', allowed: [...ALLOWED_TYPES] });
      return;
    }

    const filter: any = { userId };
    if (type) filter.refType = type;

    const bookmarks = await Bookmark.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: 'success',
      data: bookmarks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error', error });
  }
});

router.post('/:userId', async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const runWithTx = async () => {
    try {
      const { userId } = req.params;
      const { refType, refId, note, tags } = req.body as {
        refType?: string;
        refId?: string;
        note?: string;
        tags?: string[];
      };

      // ---- 기본 검증 ----
      if (!userId || typeof userId !== 'string' || !userId.trim()) {
        await session.abortTransaction();
        res.status(400).json({ message: 'invalid userId' });
        return;
      }
      if (!refType || !ALLOWED_TYPES.has(refType as any)) {
        await session.abortTransaction();
        res
          .status(400)
          .json({ message: 'invalid refType', allowed: [...ALLOWED_TYPES] });
        return;
      }
      if (!refId || !mongoose.isValidObjectId(refId)) {
        await session.abortTransaction();
        res.status(400).json({ message: 'invalid refId' });
        return;
      }

      // ---- 업서트 ----
      const filter = {
        userId: new mongoose.Types.ObjectId(userId),
        refType,
        refId: new mongoose.Types.ObjectId(refId),
      };

      const update = {
        $set: {
          ...(typeof note === 'string' ? { note } : {}),
          ...(Array.isArray(tags) ? { tags } : {}),
        },
        $setOnInsert: filter,
      };

      const result = await Bookmark.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
        rawResult: true,
        session,
      });

      const created =
        result && 'lastErrorObject' in result
          ? !result.lastErrorObject?.updatedExisting
          : false;

      await session.commitTransaction();
      res.status(created ? 201 : 200).json({
        message: 'success',
        data: result.value, // 업서트된 문서
      });
      return;
    } catch (error: any) {
      // 경쟁상황으로 인한 11000 등 예외 보정
      if (error?.code === 11000) {
        try {
          const { userId } = req.params as { userId: string };
          const { refType, refId } = req.body as {
            refType: string;
            refId: string;
          };
          const doc = await Bookmark.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            refType,
            refId: new mongoose.Types.ObjectId(refId),
          })
            .session(session)
            .lean();
          await session.commitTransaction();
          res.status(200).json({ message: 'success', data: doc });
          return;
        } catch {}
      }

      await session.abortTransaction();
      res.status(500).json({ message: 'error', error });
    }
  };

  await withRetryTransaction(session, runWithTx);
  session.endSession();
});

export default router;
