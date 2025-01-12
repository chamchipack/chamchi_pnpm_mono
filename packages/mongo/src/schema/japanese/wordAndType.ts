import { EtcType, EtcInputType } from './EtcType';
export const JapaneseTypeAnd = `
     ${EtcType}

  type Japanese {
    _id: ID
    ko: String
    jp: String
    ro: String
    etc: Etc
  }
`;

export const JapaneseInputTypeAnd = `
   ${EtcInputType}

  input JapaneseInput {
    id: ID
    ko: String
    jp: String
    ro: String
    etc: EtcInput
  }
`;
