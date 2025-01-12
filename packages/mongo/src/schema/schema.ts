import { buildSchema } from 'graphql';

import {
  JapaneseReturnType,
  JapaneseInputType,
} from './japanese/japaneseWordType';

import { vocabularyInputType, vocabularyType } from './vocabulary/vocabulary';

// Query 타입 통합
const QueryType = `
  type Query {
    getWordListAndType(input: JapaneseInput): [Japanese]
    getWordListOrType(input: JapaneseInput): [Japanese]
    getOneFromId(input: ID!): Japanese

    getVocaList(input: VocabularyInput): [Vocabulary]
  }
`;

// 모든 타입을 조합하여 스키마 빌드
const schema = buildSchema(`
  ${JapaneseReturnType}
  ${JapaneseInputType}

  ${vocabularyType}
  ${vocabularyInputType}
  ${QueryType}
`);

export default schema;
