import { ObjectId } from 'mongodb';
import client from '../config/mongo';

import dotenv from 'dotenv';
dotenv.config();
const database = process.env.DATABASE;

interface JapaneseInput {
  ko?: string;
  ro?: string;
  jp?: string;
  id?: string;
  etc?: {
    form: string;
    isVaild: boolean;
  };
}

interface Japanese {
  _id: string;
  ko: string;
  jp: string;
  ro: string;
  etc?: {
    form?: string;
    isVaild?: boolean;
  };
}

const getWords = async ({
  input,
}: {
  input?: JapaneseInput;
}): Promise<Japanese[]> => {
  try {
    await client.connect();
    const db = client.db(database);
    const usersCollection = db.collection<Japanese>('japanese');

    // 필터 생성
    const filter: Record<string, any> = {};
    if (input) {
      if (input.ko) filter.ko = { $regex: input.ko }; // 부분 문자열 검색
      if (input.jp) filter.jp = input.jp;
      if (input.ro) filter.ro = input.ro;
      if (input.id) filter._id = new ObjectId(input.id);

      // etc 필드의 조건 추가
      if (input.etc) {
        if (input.etc.form) filter['etc.form'] = input.etc.form;
        if (input.etc.isVaild !== undefined)
          filter['etc.isVaild'] = input.etc.isVaild;
      }
    }

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

export default getWords;
