import { library, libraryWithoutId } from '../../config/type/type';
import client from '../../config/test';

import { Collection, Document, ObjectId } from 'mongodb';

const getKSTDate = () => {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000; // UTC+9 밀리초
  return new Date(now.getTime() + kstOffset); // ✅ Date 객체 반환
};

interface UpdateWordResponse {
  _id: string;
  status: number; // HTTP 상태 코드
}

const updateArticle = async (
  _: undefined,
  {
    _id,
    input,
  }: {
    _id: string;
    input: library;
  },
): Promise<UpdateWordResponse> => {
  if (!input) throw new Error('인풋 데이터가 없어요!');

  try {
    const articlesCollection: Collection<Document> =
      await client.getCollection('library');

    // 업데이트 조건 및 내용
    const filter = { _id: new ObjectId(_id) };
    const updateContent = {
      $set: {
        ...input,
        updated: getKSTDate(),
      },
    };

    // MongoDB 업데이트
    const result = await articlesCollection.updateOne(filter, updateContent);

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

export default updateArticle;
