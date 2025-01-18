import { buildSchema } from 'graphql';

import {
  types as japaneseType,
  query as japaneseQuery,
  mutation as japaneseMutation,
} from './japanese';
import {
  types as vocabularyType,
  query as vocabularyQuery,
  mutation as vocabularyMutation,
} from './vocabulary';

import {
  types as Kakaotype,
  query as KakaoQuery,
  mutation as KakaoMutation,
} from './socialLogin/kakao';

const schema = buildSchema(`
  type Query {
    ${japaneseQuery}
    ${vocabularyQuery}
    ${KakaoQuery}
  }

  type Mutation {
    ${japaneseMutation}
    ${vocabularyMutation}
    ${KakaoMutation}
  }

  ${japaneseType}

  ${vocabularyType}

  ${Kakaotype}
`);

export default schema;
