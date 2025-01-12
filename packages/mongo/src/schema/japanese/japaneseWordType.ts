import { EtcType, EtcInputType, ExampleType } from './japaneseWordEtcType.ts';
export const JapaneseReturnType = `
     ${EtcType}
     ${ExampleType}

  type Japanese {
    _id: ID
    ko: String
    jp: String
    ro: String
    etc: Etc
    example: [ExampleType]
  }
`;

export const JapaneseInputType = `
   ${EtcInputType}

  input JapaneseInput {
    id: ID
    ko: String
    jp: String
    ro: String
    etc: EtcInput
  }
`;
