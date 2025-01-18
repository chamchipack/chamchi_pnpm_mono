import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import client from '../../config/mongo';
dotenv.config();
const database = process.env.DATABASE;

interface DeleteWordResponse {
  deletedCount: number; // 삭제된 문서의 개수
  status: number;       // HTTP 상태 코드
}

const deleteWord = async (_: undefined, {input: id}: {input: string}): Promise<DeleteWordResponse> => {
  try {
    // MongoDB 연결

    const db = client.db(database);
    const japaneseCollection = db.collection('japanese');

    // `_id`를 기준으로 문서 삭제
    const result = await japaneseCollection.deleteOne({ _id: new ObjectId(id) });

    // 삭제된 문서가 없을 경우 처리
    if (result.deletedCount === 0) {
      throw new Error('No document found with the provided _id.');
    }

    // 성공 시 결과 반환
    return { deletedCount: result.deletedCount, status: 204 };
  } catch (error) {
    console.error('Error while deleting word:', error);

    // 에러 반환
    throw new Error('Failed to delete word. Please try again later.');
  }
};

export default deleteWord;
