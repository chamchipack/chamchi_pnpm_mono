interface Logic {
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

export const logic: Logic[] = [
  {
    id: '001',
    name: '합니다',
    type: 'present',
    typeName: '현재형',
    value: {
      1: {
        u: 'i_ma_su',
        ku: 'ki_ma_su',
        su: 'shi_ma_su',
        tsu: 'chi_ma_su',
        nu: 'ni_ma_su',
        hu: 'hi_ma_su',
        mu: 'mi_ma_su',
        ru: 'ri_ma_su',
        bu: 'bi_ma_su',
      },
      '2': {
        ru: 'ma_su',
      },
    },
  },
  {
    id: '002',
    name: '했습니다',
    type: 'past',
    typeName: '과거형',
    value: {
      '1': {
        u: 'i_ma_shi_ta',
        ku: 'ki_ma_shi_ta',
        su: 'shi_ma_shi_ta',
        tsu: 'chi_ma_shi_ta',
        nu: 'ni_ma_shi_ta',
        hu: 'hi_ma_shi_ta',
        mu: 'mi_ma_shi_ta',
        ru: 'ri_ma_shi_ta',
        bu: 'bi_ma_shi_ta',
      },
      '2': {
        ru: 'ma_shi_ta',
      },
    },
  },
];

const s = [{ name: 's', value: 'present', go: [] }];

export const verbLogic: any = [
  {
    name: '현재진행형',
    key: 'present_continuous',
    value: [
      {
        id: 'npmaos4bp3fytgc',
        name: '안하고있다',
        value: {
          '1': {
            u: 't_te_i_na_i',
            ku: 'i_te_i_na_i',
            su: 'shi_te_i_na_i',
            tsu: 't_te_i_na_i',
            nu: 'n_de_i_na_i',
            mu: 'n_de_i_na_i',
            ru: 't_te_i_na_i',
            bu: 'n_de_i_na_i',
            gu: 'i_de_i_na_i',
          },
          '2': {
            ru: 'te_i_na_i',
          },
        },
      },
      {
        id: 'ou71bll21dfhma3',
        name: '하고있다',
        value: {
          '1': {
            u: 't_te_i_ru',
            ku: 'i_te_i_ru',
            gu: 'i_de_i_ru',
            su: 'shi_te_i_ru',
            tsu: 't_te_i_ru',
            nu: 'n_de_i_ru',
            mu: 'n_de_i_ru',
            ru: 't_te_i_ru',
            bu: 'n_de_i_ru',
          },
          '2': {
            ru: 'te_i_ru',
          },
        },
      },
    ],
  },
  {
    name: '현재형',
    key: 'present',
    value: [
      {
        id: '5phbn3mf7fawqtg',
        name: '합니다',
        value: {
          '1': {
            u: 'i_ma_su',
            ku: 'ki_ma_su',
            gu: 'gi_ma_su',
            su: 'shi_ma_su',
            tsu: 'chi_ma_su',
            nu: 'ni_ma_su',
            hu: 'hi_ma_su',
            mu: 'mi_ma_su',
            ru: 'ri_ma_su',
            bu: 'bi_ma_su',
          },
          '2': {
            ru: 'ma_su',
          },
        },
      },
      {
        id: 'ig9qx80r8gabe7z',
        name: '안하다',
        value: {
          '1': {
            u: 'wa_na_i',
            ku: 'ka_na_i',
            gu: 'ga_na_i',
            su: 'sa_na_i',
            tsu: 'ta_na_i',
            nu: 'na_na_i',
            mu: 'ma_na_i',
            ru: 'ra_na_i',
            bu: 'ba_na_i',
          },
          '2': {
            ru: 'na_i',
          },
        },
      },
      {
        id: 'tq2bvormsz0wg51',
        name: '안합니다',
        value: {
          '1': {
            u: 'i_ma_se_n',
            ku: 'ki_ma_se_n',
            gu: 'gi_ma_se_n',
            su: 'shi_ma_se_n',
            tsu: 'chi_ma_se_n',
            nu: 'ni_ma_se_n',
            hu: 'hi_ma_se_n',
            mu: 'mi_ma_se_n',
            ru: 'ri_ma_se_n',
            bu: 'bi_ma_se_n',
          },
          '2': {
            ru: 'ma_se_n',
          },
        },
      },
      {
        id: 'yvjc5skmctran9y',
        name: '하고싶다',
        value: {
          '1': {
            u: 'i_ta_i',
            ku: 'ki_ta_i',
            gu: 'gi_ta_i',
            su: 'shi_ta_i',
            tsu: 'chi_ta_i',
            nu: 'ni_ta_i',
            hu: 'hi_ta_i',
            mu: 'mi_ta_i',
            ru: 'ri_ta_i',
            bu: 'bi_ta_i',
          },
          '2': {
            ru: 'ta_i',
          },
        },
      },
      {
        id: 'h32cecemtyhutjc',
        name: '하고싶지않다',
        value: {
          '1': {
            u: 'i_ta_ku_na_i',
            ku: 'ki_ta_ku_na_i',
            gu: 'gi_ta_ku_na_i',
            su: 'shi_ta_ku_na_i',
            tsu: 'chi_ta_ku_na_i',
            nu: 'ni_ta_ku_na_i',
            hu: 'hi_ta_ku_na_i',
            mu: 'mi_ta_ku_na_i',
            ru: 'ri_ta_ku_na_i',
            bu: 'bi_ta_ku_na_i',
          },
          '2': {
            ru: 'ta_ku_na_i',
          },
        },
      },
      {
        id: 'nitxxxu3e2eoqsq',
        name: '할수없다',
        value: {
          '1': {
            u: 'e_na_i',
            ku: 'ke_na_i',
            gu: 'ge_na_i',
            su: 'se_na_i',
            tsu: 'te_na_i',
            nu: 'ne_na_i',
            hu: 'he_na_i',
            mu: 'me_na_i',
            ru: 're_na_i',
            bu: 'be_na_i',
          },
          '2': {
            ru: 'ra_re_na_i',
          },
        },
      },
      {
        id: '6qtib5ak09x7rxu',
        name: '할수있다',
        value: {
          '1': {
            u: 'e_ru',
            ku: 'ke_ru',
            gu: 'ge_ru',
            su: 'se_ru',
            tsu: 'te_ru',
            nu: 'ne_ru',
            hu: 'he_ru',
            mu: 'me_ru',
            ru: 're_ru',
            bu: 'be_ru',
          },
          '2': {
            ru: 'ra_re_ru',
          },
        },
      },
    ],
  },
  {
    name: '과거형',
    key: 'past',
    value: [
      {
        id: '3qdu711ver8ndda',
        name: '했다',
        value: {
          '1': {
            u: 't_ta',
            ku: 'i_ta',
            gu: 'i_da',
            su: 'shi_ta',
            tsu: 't_ta',
            nu: 'n_da',
            mu: 'n_da',
            ru: 't_ta',
            bu: 'n_da',
          },
          '2': {
            ru: 'ta',
          },
        },
      },
      {
        id: 'z293l0bjzsgg3wg',
        name: '안했다',
        value: {
          '1': {
            u: 'wa_na_ka_t_ta',
            ku: 'ka_na_ka_t_ta',
            gu: 'ga_na_ka_t_ta',
            su: 'sa_na_ka_t_ta',
            tsu: 'ta_na_ka_t_ta',
            nu: 'na_na_ka_t_ta',
            hu: 'ha_na_ka_t_ta',
            mu: 'ma_na_ka_t_ta',
            ru: 'ra_na_ka_t_ta',
            bu: 'ba_na_ka_t_ta',
          },
          '2': {
            ru: 'na_ka_t_ta',
          },
        },
      },
      {
        id: 'p03cc4ihpxtvv3c',
        name: '했습니다',
        value: {
          '1': {
            u: 'i_ma_shi_ta',
            ku: 'ki_ma_shi_ta',
            gu: 'gi_ma_shi_ta',
            su: 'shi_ma_shi_ta',
            tsu: 'chi_ma_shi_ta',
            nu: 'ni_ma_shi_ta',
            hu: 'hi_ma_shi_ta',
            mu: 'mi_ma_shi_ta',
            ru: 'ri_ma_shi_ta',
            bu: 'bi_ma_shi_ta',
          },
          '2': {
            ru: 'ma_shi_ta',
          },
        },
      },
      {
        id: '3oxm397qrhhd0dj',
        name: '안했습니다',
        value: {
          '1': {
            u: 'i_ma_se_n_de_shi_ta',
            ku: 'ki_ma_se_n_de_shi_ta',
            gu: 'gi_ma_se_n_de_shi_ta',
            su: 'shi_ma_se_n_de_shi_ta',
            tsu: 'chi_ma_se_n_de_shi_ta',
            nu: 'ni_ma_se_n_de_shi_ta',
            hu: 'hi_ma_se_n_de_shi_ta',
            mu: 'mi_ma_se_n_de_shi_ta',
            ru: 'ri_ma_se_n_de_shi_ta',
            bu: 'bi_ma_se_n_de_shi_ta',
          },
          '2': {
            ru: 'ma_se_n_de_shi_ta',
          },
        },
      },
      {
        id: 'eyn3m5t0f82gsg9',
        name: '하고싶었다',
        value: {
          '1': {
            u: 'i_ta_ka_t_ta',
            ku: 'ki_ta_ka_t_ta',
            gu: 'gi_ta_ka_t_ta',
            su: 'shi_ta_ka_t_ta',
            tsu: 'chi_ta_ka_t_ta',
            nu: 'ni_ta_ka_t_ta',
            hu: 'hi_ta_ka_t_ta',
            mu: 'mi_ta_ka_t_ta',
            ru: 'ri_ta_ka_t_ta',
            bu: 'bi_ta_ka_t_ta',
          },
          '2': {
            ru: 'ta_ka_t_ta',
          },
        },
      },
      {
        id: 'q113h1x2mn0m5gz',
        name: '하고싶지않았다',
        value: {
          '1': {
            u: 'i_ta_ku_na_ka_t_ta',
            ku: 'ki_ta_ku_na_ka_t_ta',
            gu: 'gi_ta_ku_na_ka_t_ta',
            su: 'shi_ta_ku_na_ka_t_ta',
            tsu: 'chi_ta_ku_na_ka_t_ta',
            nu: 'ni_ta_ku_na_ka_t_ta',
            hu: 'hi_ta_ku_na_ka_t_ta',
            mu: 'mi_ta_ku_na_ka_t_ta',
            ru: 'ri_ta_ku_na_ka_t_ta',
            bu: 'bi_ta_ku_na_ka_t_ta',
          },
          '2': {
            ru: 'ta_ku_na_ka_t_ta',
          },
        },
      },
    ],
  },
  {
    name: '미래형',
    key: 'future',
    value: [],
  },
  {
    name: '수동태',
    key: 'passive',
    value: [
      {
        id: 'i6fqpkb5qi0vndf',
        name: '수동태 기본 과거 반말',
        value: {
          '1': {
            u: 'wa_re_ta',
            ku: 'ka_re_ta',
            gu: 'ga_re_ta',
            su: 'sa_re_ta',
            tsu: 'ta_re_ta',
            nu: 'na_re_ta',
            mu: 'ma_re_ta',
            ru: 'ra_re_ta',
            bu: 'ba_re_ta',
          },
          '2': {
            ru: 'ra_re_ta',
          },
        },
      },
      {
        id: 'nnt60ppwlqf1iqd',
        name: '수동태 기본 반말',
        value: {
          '1': {
            u: 'wa_re_ru',
            ku: 'ka_re_ru',
            gu: 'ga_re_ru',
            su: 'sa_re_ru',
            tsu: 'ta_re_ru',
            nu: 'na_re_ru',
            mu: 'ma_re_ru',
            ru: 'ra_re_ru',
            bu: 'ba_re_ru',
          },
          '2': {
            ru: 'ra_re_ru',
          },
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
        name: '하지말아주세요',
        value: {
          '1': {
            u: 'wa_na_i_de_ku_da_sa_i',
            ku: 'ka_na_i_de_ku_da_sa_i',
            gu: 'ga_na_i_de_ku_da_sa_i',
            su: 'sa_na_i_de_ku_da_sa_i',
            tsu: 'ta_na_i_de_ku_da_sa_i',
            nu: 'na_na_i_de_ku_da_sa_i',
            mu: 'ma_na_i_de_ku_da_sa_i',
            ru: 'ra_na_i_de_ku_da_sa_i',
            bu: 'ba_na_i_de_ku_da_sa_i',
          },
          '2': {
            ru: 'na_i_de_ku_da_sa_i',
          },
        },
      },
      {
        id: 'e4hkv8111lofy5x',
        name: '하면안된다',
        value: {
          '1': {
            u: 't_te_ha_i_ke_na_i',
            ku: 'i_te_ha_i_ke_na_i',
            gu: 'i_de_ha_i_ke_na_i',
            su: 'shi_te_ha_i_ke_na_i',
            tsu: 't_te_ha_i_ke_na_i',
            nu: 'n_de_ha_i_ke_na_i',
            mu: 'n_de_ha_i_ke_na_i',
            ru: 't_te_ha_i_ke_na_i',
            bu: 'n_de_ha_i_ke_na_i',
          },
          '2': {
            ru: 'te_ha_i_ke_na_i',
          },
        },
      },
      {
        id: '1p9gy6wzxexgi9t',
        name: '해라',
        value: {
          '1': {
            u: 't_te',
            ku: 'i_te',
            gu: 'i_de',
            su: 'shi_te',
            tsu: 't_te',
            nu: 'n_de',
            mu: 'n_de',
            ru: 't_te',
            bu: 'n_de',
          },
          '2': {
            ru: 'te',
          },
        },
      },
    ],
  },
  {
    name: '기타',
    key: 'etc',
    value: [
      {
        id: 'x879qxf8tovrb1w',
        name: '~하지말고',
        value: {
          '1': {
            u: 'wa_na_i_de',
            ku: 'ka_na_i_de',
            gu: 'ga_na_i_de',
            su: 'sa_na_i_de',
            tsu: 'ta_na_i_de',
            nu: 'na_na_i_de',
            mu: 'ma_na_i_de',
            ru: 'ra_na_i_de',
            bu: 'ba_na_i_de',
          },
          '2': {
            ru: 'na_i_de',
          },
        },
      },
      {
        id: 'vneol5kblhj90uq',
        name: '~아닐지도모른다',
        value: {
          '1': {
            u: 'wa_na_i_ka_mo_shi_re_na_i',
            ku: 'ka_na_i_ka_mo_shi_re_na_i',
            gu: 'ga_na_i_ka_mo_shi_re_na_i',
            su: 'sa_na_i_ka_mo_shi_re_na_i',
            tsu: 'ta_na_i_ka_mo_shi_re_na_i',
            nu: 'na_na_i_ka_mo_shi_re_na_i',
            hu: 'ha_na_i_ka_mo_shi_re_na_i',
            mu: 'ma_na_i_ka_mo_shi_re_na_i',
            ru: 'ra_na_i_ka_mo_shi_re_na_i',
            bu: 'ba_na_i_ka_mo_shi_re_na_i',
          },
          '2': {
            ru: 'na_i_ka_mo_shi_re_na_i',
          },
        },
      },
      {
        id: 'dmey450m6wppwef',
        name: '~일지도모른다 (불확실)',
        value: {
          '1': {
            u: 'u_ka_mo_shi_re_na_i',
            ku: 'ku_ka_mo_shi_re_na_i',
            gu: 'gu_ka_mo_shi_re_na_i',
            su: 'su_ka_mo_shi_re_na_i',
            tsu: 'tu_ka_mo_shi_re_na_i',
            nu: 'nu_ka_mo_shi_re_na_i',
            hu: 'hu_ka_mo_shi_re_na_i',
            mu: 'mu_ka_mo_shi_re_na_i',
            ru: 'ru_ka_mo_shi_re_na_i',
            bu: 'bu_ka_mo_shi_re_na_i',
          },
          '2': {
            ru: 'ru_ka_mo_shi_re_na_i',
          },
        },
      },
    ],
  },
];
