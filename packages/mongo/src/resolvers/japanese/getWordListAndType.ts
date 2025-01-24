import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import client from '../../config/mongo';
import { TypeGbn, Word } from './type';
dotenv.config();
const database = process.env.DATABASE;

const getWordListAndType = async (_: undefined, {
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
    const filter: Record<string, any> = {};
    if (input) {
      if (input.ko) filter.ko = input.ko; // 부분 문자열 검색
      if (input.jp) filter.jp = input.jp;
      if (input.ro) filter.ro = input.ro;
      if (input.kana) filter.kana = input.kana;
      if (input._id) filter._id = new ObjectId(input._id);
      if (input.type) filter.type = input.type;
    }

    // 데이터 검색
    const japanese = await japaneseCollection
      .find(filter)
      .skip(offset)
      .limit(limit)
      .toArray();

    // await collection.countDocuments(filter);
    return japanese;
  } catch (error) {
    console.error('Error fetching japanese:', error);
    throw new Error('Error fetching japanese');
  } finally {
    // await client.close();
  }
};

export default getWordListAndType;
