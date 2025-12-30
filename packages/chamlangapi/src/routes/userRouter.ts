import express from 'express';
import mongoose from 'mongoose';
import { withRetryTransaction } from '../utils/withRetryTransaction';
import { User } from '../schemas/User';

const router = express.Router();

// 유저 로그인
router.post('/login', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const runWithTransaction = async () => {
    try {
      const { socialId, provider } = req.body;

      let user = await User.findOne({ socialId, provider }).lean();

      if (!user) {
        const adj = [
          '멋진',
          '빠른',
          '기분좋은',
          '재미있는',
          '행복한',
          '영리한',
          '친절한',
        ];
        const noun = ['사자', '호랑이', '곰', '토끼', '사슴', '여우', '늑대'];

        let nickname = '';

        while (true) {
          const randomAdj = adj[Math.floor(Math.random() * adj.length)];
          const randomNoun = noun[Math.floor(Math.random() * noun.length)];
          const randomNum = Math.floor(Math.random() * 1000);

          nickname = `${randomAdj}${randomNoun}${randomNum}`;

          const userNick = await User.findOne({ nickname })
            .select('_id')
            .lean();

          if (!userNick) break;
        }

        const newUserData: any = {
          socialId,
          provider,
          nickname,
        };

        const newUsers = await User.create([newUserData], { session });
        user = newUsers[0];
      } else {
        if (user.isDeleted) {
          await session.abortTransaction();
          return res.status(404).json({ message: '탈퇴한 회원입니다.' });
        }
      }

      // const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET!);

      await session.commitTransaction();
      return res.status(200).json({
        message: 'success',
        data: {
          user,
          // token,
        },
      });
    } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({
        message: 'error',
        error,
      });
    }
  };

  await withRetryTransaction(session, runWithTransaction);
  session.endSession();
});

// 유저 탈퇴
router.delete('/:_id', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const runWithTransaction = async () => {
    try {
      const { _id } = req.params;

      const user = await User.findById(_id).select('isDeleted').lean();

      if (!user) {
        await session.abortTransaction();
        return res.status(404).json({ message: '존재하지 않는 유저입니다.' });
      }

      if (user.isDeleted) {
        await session.abortTransaction();
        return res.status(404).json({ message: '이미 탈퇴한 유저입니다.' });
      }

      await User.updateOne({ _id }, { $set: { isDeleted: true } }, { session });

      await session.commitTransaction();
      return res.status(200).json({ message: 'success' });
    } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({ message: 'error', error });
    }
  };

  await withRetryTransaction(session, runWithTransaction);
  session.endSession();
});

export default router;
