/**
 * @description 조회용 일본어 타입
 * input: 인풋용
 * type : 리턴값
 */

export const etcType = `
  type EtcType {
    form: String
    endingjp: String
    endingro: String
    stemjp: String
    stemro: String
    exception: Boolean
  }

  input EtcInput {
    form: String
    endingjp: String
    endingro: String
    stemjp: String
    stemro: String
    exception: Boolean
  }
`;

export const exampleType = `
    type ExampleType {
        jp: String
        ko: String
    }

  input ExampleInput {
    jp: String
    ko: String
  }
`;

export const japaneseWordType = `
    type Japanese {
        _id: ID
        ko: String
        jp: String
        ro: String
        type: String
        kana: String
        etc: EtcType
        desc: String
        example: [ExampleType]
    }

  input JapaneseInput {
    _id: ID
    ko: String
    jp: String
    ro: String
    type: String
    kana: String
    etc: EtcInput
  }  
`;

export const japaneseWordCreateType = `
  input JapaneseCreateInput {
    ko: String!
    jp: String!
    ro: String!
    type: String
    desc: String
    example: [ExampleInput]
    kana: String
    language: String
    etc: EtcInput
  }

  type CreateWordResponse {
    _id: ID
    status: Int
  }
`;

export const japaneseWordUpdateType = `
  input JapaneseUpdateInput {
    ko: String
    jp: String
    ro: String
    type: String
    desc: String
    example: [ExampleInput]
    kana: String
    language: String
    etc: EtcInput
  }

  type UpdateWordResponse {
    _id: ID
    status: Int
  }
`;

export const japaneseWordDeleteType = `
  type DeleteWordResponse {
    deletedCount: Int
    status: Int
  }
`


/**
 *
 *
 * @description type : 타입 및 인풋을 모아둔 자료셋
 * query : 리졸브
 * mutation : 뮤테이션
 */
export const types = `
    ${etcType}
    ${exampleType}
    ${japaneseWordType}
    ${japaneseWordCreateType}
    ${japaneseWordDeleteType}
    ${japaneseWordUpdateType}
`;

export const query = `
    """
    조건이 AND 조건으로 검색하는 메소드 입니다.
    """    
    getWordListAndType(input: JapaneseInput, offset: Int, limit: Int): [Japanese]

    """
    조건별로 or 조건으로 검색하는 메소드 입니다.
    """    
    getWordListOrType(input: JapaneseInput): [Japanese]

    """
    _id로 단일의 문서를 검색합니다.
    """
    getOneWordFromId(input: ID!): Japanese

    """
    input의 조건에 맞는 문서의 총 개수를 가져옵니다.
    """    
    getWordListTotalcount(input: JapaneseInput): Int
`;

export const mutation = `
    createWord(input: JapaneseCreateInput): CreateWordResponse

    """
    """
    deleteWord(input: ID!): DeleteWordResponse

    """
    """
    updateWord(_id: ID!, input: JapaneseUpdateInput): UpdateWordResponse
`;
