import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import client from '../../../config/mongo';
import { Vocabulary } from './type';
dotenv.config();
const database = process.env.DATABASE;

const getVocaList = async (
  _: undefined,
  {
    input,
  }: {
    input?: Vocabulary;
  },
): Promise<Vocabulary[]> => {
  try {
    // await client.connect();
    const db = client.db(database);
    const japaneseCollection = db.collection<Vocabulary>('vocabulary');

    console.log(input);

    // 필터 생성
    const filter: Record<string, any> = {};
    if (input) {
      if (input.name) filter.name = input.name; // 부분 문자열 검색
      if (input.language) filter.language = input.language;
      if (input.userId) filter.userId = input.userId;
      if (input._id) filter._id = new ObjectId(input._id);
    }

    // 데이터 검색
    const japanese = await japaneseCollection.find(filter).toArray();
    return japanese;
  } catch (error) {
    console.error('Error fetching japanese:', error);
    throw new Error('Error fetching japanese');
  } finally {
    // await client.close();
  }
};

export default getVocaList;
