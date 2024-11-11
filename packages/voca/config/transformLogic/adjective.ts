interface AdjectiveLogic {
  id: string;
  name: string;
  type:
    | 'present'
    | 'past'
    | 'present_continuous'
    | 'future'
    | 'passive'
    | 'imperative'
    | 'etc';
  typeName: string;
  value: any;
}

export const logic: AdjectiveLogic[] = [
  {
    id: '001',
    name: '입니다',
    type: 'present',
    typeName: '현재형',
    value: {
      i: 'de_su',
      na: 'de_su',
    },
  },
];

export const adjLogic: any = [
  {
    name: '현재형',
    key: 'present',
    value: [
      {
        id: '0001',
        name: '입니다',
        value: {
          i: 'i_de_su',
          na: 'de_su',
        },
      },
      {
        id: '0002',
        name: '~지 않습니다',
        value: {
          i: 'ku_a_ri_ma_se_n',
          na: 'de_ha_a_ri_ma_se_n',
        },
      },
    ],
  },
];
