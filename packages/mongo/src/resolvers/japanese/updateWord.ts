import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import client from '../../config/mongo';
import { TypeGbn, Word } from './type';

dotenv.config();
const database = process.env.DATABASE;

interface UpdateWordInput {
  id: string; // 업데이트할 문서의 ID
  update: Partial<{ ko: string; jp: string; ro: string; type: string }>; // 업데이트할 필드들
}

interface UpdateWordResponse {
    _id: string
//   matchedCount: number; // 업데이트 대상 문서 수
//   modifiedCount: number; // 실제 업데이트된 문서 수
  status: number;        // HTTP 상태 코드
}

const updateWord = async (_: undefined, {
    _id,
  input,
}: {
    _id: string
  input: Word<TypeGbn>;
}): Promise<UpdateWordResponse> => {
  try {

    const db = client.db(database);
    const japaneseCollection = db.collection('japanese');

    // 업데이트 조건 및 내용
    const filter = { _id: new ObjectId(_id) };
    const updateContent = { $set: input };

    // MongoDB 업데이트
    const result = await japaneseCollection.updateOne(filter, updateContent);

    if (result.matchedCount === 0) {
      throw new Error('No document found with the provided _id.');
    }

    // 업데이트 결과 반환
    return {
    //   matchedCount: result.matchedCount,
    //   modifiedCount: result.modifiedCount,
    _id,
      status: 200, // 200: 성공, 304: 수정되지 않음
    };
  } catch (error) {
    console.error('Error while updating word:', error);

    // 에러 반환
    throw new Error('Failed to update word. Please try again later.');
  }
};

export default updateWord;
