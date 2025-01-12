import { ObjectId } from 'mongodb';
import client from '../../config/mongo';
import { Word, TypeGbn } from './type';
import dotenv from 'dotenv';
dotenv.config();
const database = process.env.DATABASE;

const getOneFromId = async ({
  input,
}: {
  input?: ObjectId;
}): Promise<Word<TypeGbn>> => {
  try {
    // await client.connect();
    const db = client.db(database);
    const japaneseCollection = db.collection<Word<TypeGbn>>('japanese');

    if (!input) throw new Error('_id is Empty');
    const filter = { _id: new ObjectId(input) };

    // 데이터 하나 검색
    const word = await japaneseCollection.findOne(filter);

    if (!word) {
      throw new Error(`Word with id ${input} not found`);
    }

    return word || {}; // 결과 반환
  } catch (error) {
    console.error('Error fetching japanese:', error);
    throw new Error('Error fetching japanese');
  } finally {
    // await client.close();
  }
};

export default getOneFromId;
