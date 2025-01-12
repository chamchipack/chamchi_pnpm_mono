import { EtcType, EtcInputType } from './EtcType';

export const JapaneseTypeOr = `

  type JapaneseOr {
    ko: String
    jp: String
    ro: String
    etc: Etc
  }
`;

export const JapaneseInputTypeOr = `

  input JapaneseInputOr {
    ko: String
    jp: String
    ro: String
    etc: EtcInput
  }
`;
