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

const schema = buildSchema(`
  type Query {
    ${japaneseQuery}
    ${vocabularyQuery}
  }

  type Mutation {
    ${japaneseMutation}
    ${vocabularyMutation}
  }

  ${japaneseType}

  ${vocabularyType}
`);

export default schema;
