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
    name: '기타',
    key: 'etc',
    value: [
      {
        id: '',
        name: '명사 꾸미기',
        value: {
          i: 'i',
          na: 'na',
        },
      },
    ],
  },
  {
    name: '명령형',
    key: 'imperative',
    value: [
      {
        id: '',
        name: '~해줘',
        value: {
          i: 'ku_shi_te',
          na: 'ni_shi_te',
        },
      },
      {
        id: '',
        name: '~해주세요',
        value: {
          i: 'ku_shi_te_ku_da_sa_i',
          na: 'ni_shi_te_ku_da_sa_i',
        },
      },
    ],
  },
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
      {
        id: '',
        name: '~일것이다',
        value: {
          i: 'i_da_ro_u',
          na: 'da_ro_u',
        },
      },
      {
        id: '',
        name: '~일것입니다',
        value: {
          i: 'i_de_sho_u',
          na: 'de_sho_u',
        },
      },
    ],
  },
  {
    name: '과거형',
    key: 'past',
    value: [
      {
        id: '',
        name: '였다',
        value: {
          i: 'ka_t_ta',
          na: 'da_t_ta',
        },
      },
      {
        id: '0003',
        name: '였습니다',
        value: {
          i: 'ka_t_ta_de_su',
          na: 'de_shi_ta',
        },
      },
    ],
  },
];
