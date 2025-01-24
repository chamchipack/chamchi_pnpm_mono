import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import client from '../../config/mongo';
import { TypeGbn, Word } from './type';
dotenv.config();
const database = process.env.DATABASE;

interface CreateWordResponse {
  _id: ObjectId;
  status: number;
}

const createWord = async (_: undefined, {
  input,
}: {
  input: Word<TypeGbn>;
}): Promise<CreateWordResponse> => {
  try {
    // MongoDB 연결 확인
    const db = client.db(database);
    const japaneseCollection = db.collection<Word<TypeGbn>>('japanese');

    // 데이터 저장
    const result = await japaneseCollection.insertOne(input);

    // 결과 반환
    return { _id: result.insertedId as ObjectId, status: 201 };
  } catch (error) {
    console.error('Error while creating word:', error);

    // 적절한 에러 반환
    throw new Error('Failed to create word. Please try again later.');
  }
};

export default createWord;
