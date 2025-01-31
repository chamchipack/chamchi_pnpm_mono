import { libraryWithoutId } from '../../config/type/type';
import client from '../../config/test';
import dotenv from 'dotenv';

import { Collection, Document, ObjectId } from 'mongodb';

dotenv.config();
const database = process.env.DATABASE;

interface CreateArticleResponse {
  _id: ObjectId;
  status: number;
}

const getKSTDate = () => {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000; // UTC+9 밀리초
  return new Date(now.getTime() + kstOffset); // ✅ Date 객체 반환
};

const createArticle = async (
  _: undefined,
  {
    input,
  }: {
    input: libraryWithoutId;
  },
): Promise<CreateArticleResponse> => {
  if (!input) throw new Error('인풋 데이터가 없어요!');
  try {
    // MongoDB 연결 확인
    const articlesCollection: Collection<Document> =
      await client.getCollection('library');

    const nowISO = getKSTDate();

    // 저장할 데이터 (created & updated 추가)
    const dataToInsert = {
      ...input,
      created: nowISO,
      updated: nowISO, // 처음 생성 시 `updated`도 동일한 값
    };

    // 데이터 저장
    const result = await articlesCollection.insertOne(input);

    // 결과 반환
    return { _id: result.insertedId as ObjectId, status: 201 };
  } catch (error) {
    console.error('Error while creating word:', error);

    // 적절한 에러 반환
    throw new Error('Failed to create word. Please try again later.');
  }
};

export default createArticle;
