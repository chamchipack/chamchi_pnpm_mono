import { library } from '../../config/type/type';
import client from '../../config/test';
import dotenv from 'dotenv';

import { Collection, Document } from 'mongodb';

dotenv.config();
const database = process.env.DATABASE;

const getArticleListOrType = async (
  _: undefined,
  {
    input,
    offset = 0,
    limit = 10,
  }: {
    input?: library;
    offset?: number;
    limit?: number;
  },
): Promise<library[]> => {
  // console.log(input, offset, limit);
  try {
    const articlesCollection: Collection<Document> =
      await client.getCollection('library');

    const orConditions: Record<string, any>[] = [];

    if (input) {
      // 각 조건을 $or에 추가
      if (input.markdown_title)
        orConditions.push({ markdown_title: { $regex: input.markdown_title } }); // 부분 문자열 검색

      if (input.tag && input.tag.length > 0) {
        orConditions.push({ tag: { $in: input.tag } });
      }
    }

    const andConditions: Record<string, any>[] = [];

    if (input?.category) andConditions.push({ category: input.category });
    if (input?.theme) andConditions.push({ theme: input.theme });
    if (input?.isPublic) andConditions.push({ isPublic: input.isPublic });

    const filter: Record<string, any> = {};
    if (orConditions.length > 0) {
      filter.$or = orConditions;
    }
    if (andConditions.length > 0) {
      filter.$and = andConditions;
    }

    const result = await articlesCollection
      .find(filter)
      .sort({ created: -1 }) // 🔥 `created` 기준 최신순 정렬
      .skip(offset)
      .limit(limit)
      .toArray();

    return result as library[] | [];
  } catch (e) {
    console.error('Error fetching articles:', e);
    throw new Error('Error fetching articles');
  }
};

export default getArticleListOrType;
