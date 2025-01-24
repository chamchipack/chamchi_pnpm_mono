import dotenv from 'dotenv';
import client from '../../config/mongo';

import { TypeGbn, Word } from './type';
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

const getWordListOrType = async (_: undefined, {
  input,
  offset = 0,
  limit = 10,
}: {
  input?: Word<TypeGbn>;
  offset?: number;
  limit?: number;
}): Promise<Word<TypeGbn>[]> => {
  try {
    // await client.connect();
    const db = client.db(database);
    const japaneseCollection = db.collection<Word<TypeGbn>>('japanese');

    // 필터 생성
    const orConditions: Record<string, any>[] = [];
    if (input) {
      // 각 조건을 $or에 추가
      if (input.ko) orConditions.push({ ko: { $regex: input.ko } }); // 부분 문자열 검색
      if (input.jp) orConditions.push({ jp: { $regex: input.jp } });
      if (input.ro) orConditions.push({ ro: { $regex: input.ro } });
      if (input.kana) orConditions.push({ kana: { $regex: input.kana } });

      // etc 필드의 조건 추가
      // if (input.etc) {
      //   if (input.etc.form) orConditions.push({ 'etc.form': input.etc.form });
      //   if (input.etc.isVaild !== undefined) {
      //     orConditions.push({ 'etc.isVaild': input.etc.isVaild });
      //   }
      // }
    }

    const andConditions: Record<string, any>[] = [];
    if (input?.type) {
      andConditions.push({ type: input.type });
    }

    const filter: Record<string, any> = {};
    if (orConditions.length > 0) {
      filter.$or = orConditions;
    }
    if (andConditions.length > 0) {
      filter.$and = andConditions;
    }

    // $or 조건이 존재하면 필터로 추가
    // const filter = orConditions.length > 0 ? { $or: orConditions } : {};

    // 데이터 검색
    const japanese = await japaneseCollection.find(filter).skip(offset)
    .limit(limit)
    .toArray()
    return japanese;
  } catch (error) {
    console.error('Error fetching japanese:', error);
    throw new Error('Error fetching japanese');
  } finally {
    // await client.close();
  }
};

export default getWordListOrType;
