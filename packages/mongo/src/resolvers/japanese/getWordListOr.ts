import { ObjectId } from 'mongodb';
import client from '../..//config/mongo';

import dotenv from 'dotenv';
dotenv.config();
const database = process.env.DATABASE;

interface JapaneseInput {
  ko?: string;
  ro?: string;
  jp?: string;
  etc?: {
    form: string;
    isVaild: boolean;
  };
}

interface Japanese {
  //   _id: string;
  ko: string;
  jp: string;
  ro: string;
  etc?: {
    form?: string;
    isVaild?: boolean;
  };
}

const getWordListOr = async ({
  input,
}: {
  input?: JapaneseInput;
}): Promise<Japanese[]> => {
  try {
    await client.connect();
    const db = client.db(database);
    const usersCollection = db.collection<Japanese>('japanese');

    // 필터 생성
    const orConditions: Record<string, any>[] = [];
    if (input) {
      // 각 조건을 $or에 추가
      if (input.ko) orConditions.push({ ko: { $regex: input.ko } }); // 부분 문자열 검색
      if (input.jp) orConditions.push({ jp: input.jp });
      if (input.ro) orConditions.push({ ro: input.ro });

      // etc 필드의 조건 추가
      if (input.etc) {
        if (input.etc.form) orConditions.push({ 'etc.form': input.etc.form });
        if (input.etc.isVaild !== undefined) {
          orConditions.push({ 'etc.isVaild': input.etc.isVaild });
        }
      }
    }

    // $or 조건이 존재하면 필터로 추가
    const filter = orConditions.length > 0 ? { $or: orConditions } : {};

    // 데이터 검색
    const users = await usersCollection.find(filter).toArray();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  } finally {
    await client.close();
  }
};

export default getWordListOr;
