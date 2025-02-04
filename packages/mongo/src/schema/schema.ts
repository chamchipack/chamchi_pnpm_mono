import { buildSchema } from 'graphql';

import {
  mutation as japaneseMutation,
  query as japaneseQuery,
  types as japaneseType,
} from './voca/japanese';
import {
  mutation as vocabularyMutation,
  query as vocabularyQuery,
  types as vocabularyType,
} from './voca/vocabulary';

import {
  mutation as KakaoMutation,
  query as KakaoQuery,
  types as Kakaotype,
} from './socialLogin/kakao';

import {
  types as articleTypes,
  query as articleQuery,
  mutation as articleMutation,
} from './blog/schema';

const schema = buildSchema(`
  type Query {
    ${japaneseQuery}
    ${vocabularyQuery}
    ${KakaoQuery}
    ${articleQuery}
  }

  type Mutation {
    ${japaneseMutation}
    ${vocabularyMutation}
    ${KakaoMutation}
    ${articleMutation}
  }

  ${japaneseType}

  ${vocabularyType}

  ${Kakaotype}

  ${articleTypes}
`);

export default schema;
