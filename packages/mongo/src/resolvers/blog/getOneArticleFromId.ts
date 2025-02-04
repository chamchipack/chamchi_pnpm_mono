import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import client from '../../config/test';
import { Collection, Document } from 'mongodb';
import { library } from '../../config/type/type';

dotenv.config();
const database = process.env.DATABASE;

const getOneArticleFromId = async (
  _: undefined,
  {
    input,
  }: {
    input?: ObjectId;
  },
): Promise<library> => {
  try {
    // await client.connect();
    const articlesCollection: Collection<Document> =
      await client.getCollection('library');

    if (!input) throw new Error('_id is Empty');
    const filter = { _id: new ObjectId(input) };

    // 데이터 하나 검색
    const article = await articlesCollection.findOne(filter);

    if (!article) {
      throw new Error(`Word with id ${input} not found`);
    }

    return article as library | any; // 결과 반환
  } catch (error) {
    console.error('Error fetching call article:', error);
    throw new Error('Error fetching call article');
  } finally {
    // await client.close();
  }
};

export default getOneArticleFromId;
