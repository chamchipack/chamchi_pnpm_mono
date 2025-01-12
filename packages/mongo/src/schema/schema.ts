import { buildSchema } from 'graphql';

// AND와 OR 타입 정의 가져오기
import { JapaneseTypeAnd, JapaneseInputTypeAnd } from './japanese/wordAndType';
import { JapaneseTypeOr, JapaneseInputTypeOr } from './japanese/wordOrType';

// Query 타입 통합
const QueryType = `
  type Query {
    getWords(input: JapaneseInput): [Japanese]

    getWordListOr(input: JapaneseInputOr): [JapaneseOr]

  }
`;

// 모든 타입을 조합하여 스키마 빌드
const schema = buildSchema(`
  ${JapaneseTypeAnd}
  ${JapaneseInputTypeAnd}
  ${JapaneseTypeOr}
  ${JapaneseInputTypeOr}
  ${QueryType}
`);

export default schema;
