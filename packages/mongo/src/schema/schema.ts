import { buildSchema } from 'graphql';

import {
  mutation as japaneseMutation, query as japaneseQuery, types as japaneseType
} from './japanese';
import {
  mutation as vocabularyMutation, query as vocabularyQuery, types as vocabularyType
} from './vocabulary';

import {
  mutation as KakaoMutation, query as KakaoQuery, types as Kakaotype
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
