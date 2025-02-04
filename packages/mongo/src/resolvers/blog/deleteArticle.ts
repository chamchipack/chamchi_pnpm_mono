import { libraryWithoutId } from '../../config/type/type';
import client from '../../config/test';
import dotenv from 'dotenv';

import { Collection, Document, ObjectId } from 'mongodb';

dotenv.config();
const database = process.env.DATABASE;

interface DeleteWordResponse {
  deletedCount: number; // 삭제된 문서의 개수
  status: number; // HTTP 상태 코드
}

const deleteArticle = async (
  _: undefined,
  { input: id }: { input: string },
): Promise<DeleteWordResponse> => {
  if (!id) throw new Error('인풋 데이터가 없어요!');
  try {
    // MongoDB 연결 확인
    const articlesCollection: Collection<Document> =
      await client.getCollection('library');

    const result = await articlesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // 삭제된 문서가 없을 경우 처리
    if (result.deletedCount === 0) {
      throw new Error('No document found with the provided _id.');
    }

    // 성공 시 결과 반환
    return { deletedCount: result.deletedCount, status: 204 };
  } catch (error) {
    console.error('Error while creating word:', error);

    // 적절한 에러 반환
    throw new Error('Failed to create word. Please try again later.');
  }
};

export default deleteArticle;
