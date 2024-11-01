// word
// logic
// example 예문

export interface Verb {
  stemjp: string;
  stemro: string;
  endingjp: string;
  endingro: string;
  form: number;
  exception: boolean;
}

interface Noun {}

export interface Word<T> {
  id: string;
  ko: string;
  jp: string;
  kana: string;
  ro: string;
  type: 'verb' | 'noun' | 'adv' | 'adj';
  language: string;
  etc: T;
}

export const typeGbn = {
  verb: '동사',
  noun: '명사',
  adv: '부사',
  adj: '형용사',
};

export const good: Word<Verb>[] = [
  {
    id: '',
    language: 'japanese',
    ko: '찾다',
    jp: '探す',
    kana: 'さがす',
    ro: 'sagasu',
    type: 'verb',
    etc: {
      stemjp: '探',
      stemro: 'saga',
      endingjp: 'す',
      endingro: 'su',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '타다',
    jp: '乗る',
    kana: 'のる',
    ro: 'noru',
    type: 'verb',
    etc: {
      stemjp: '乗',
      stemro: 'no',
      endingjp: 'る',
      endingro: 'ru',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '열다',
    jp: '開ける',
    kana: 'あける',
    ro: 'akeru',
    type: 'verb',
    etc: {
      stemjp: '開',
      stemro: 'ake',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '받다',
    jp: '受ける',
    kana: 'うける',
    ro: 'ukeru',
    type: 'verb',
    etc: {
      stemjp: '受',
      stemro: 'uke',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '살다',
    jp: '生きる',
    kana: 'いきる',
    ro: 'ikiru',
    type: 'verb',
    etc: {
      stemjp: '生',
      stemro: 'iki',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '주다',
    jp: '与える',
    kana: 'あたえる',
    ro: 'ataeru',
    type: 'verb',
    etc: {
      stemjp: '与',
      stemro: 'atae',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '믿다',
    jp: '信じる',
    kana: 'しんじる',
    ro: 'shinjiru',
    type: 'verb',
    etc: {
      stemjp: '信',
      stemro: 'shin',
      endingjp: 'じる',
      endingro: 'jiru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '남기다',
    jp: '残す',
    kana: 'のこす',
    ro: 'nokosu',
    type: 'verb',
    etc: {
      stemjp: '残',
      stemro: 'noko',
      endingjp: 'す',
      endingro: 'su',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '이기다',
    jp: '勝つ',
    kana: 'かつ',
    ro: 'katsu',
    type: 'verb',
    etc: {
      stemjp: '勝',
      stemro: 'ka',
      endingjp: 'つ',
      endingro: 'tsu',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '끝내다',
    jp: '終える',
    kana: 'おえる',
    ro: 'oeru',
    type: 'verb',
    etc: {
      stemjp: '終',
      stemro: 'oe',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '지다',
    jp: '負ける',
    kana: 'まける',
    ro: 'makeru',
    type: 'verb',
    etc: {
      stemjp: '負',
      stemro: 'make',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '받아들이다',
    jp: '受け入れる',
    kana: 'うけいれる',
    ro: 'ukeireru',
    type: 'verb',
    etc: {
      stemjp: '受け入',
      stemro: 'ukeire',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '타오르다',
    jp: '燃える',
    kana: 'もえる',
    ro: 'moeru',
    type: 'verb',
    etc: {
      stemjp: '燃',
      stemro: 'moe',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '서다',
    jp: '立つ',
    kana: 'たつ',
    ro: 'tatsu',
    type: 'verb',
    etc: {
      stemjp: '立',
      stemro: 'ta',
      endingjp: 'つ',
      endingro: 'tsu',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '헤엄치다',
    jp: '泳ぐ',
    kana: 'およぐ',
    ro: 'oyogu',
    type: 'verb',
    etc: {
      stemjp: '泳',
      stemro: 'oyo',
      endingjp: 'ぐ',
      endingro: 'gu',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '돌아보다',
    jp: '振り返る',
    kana: 'ふりかえる',
    ro: 'furikaeru',
    type: 'verb',
    etc: {
      stemjp: '振り返',
      stemro: 'furikae',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '오르다',
    jp: '上がる',
    kana: 'あがる',
    ro: 'agaru',
    type: 'verb',
    etc: {
      stemjp: '上',
      stemro: 'aga',
      endingjp: 'る',
      endingro: 'ru',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '내려가다',
    jp: '下がる',
    kana: 'さがる',
    ro: 'sagaru',
    type: 'verb',
    etc: {
      stemjp: '下',
      stemro: 'saga',
      endingjp: 'る',
      endingro: 'ru',
      form: 1,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '일어나다',
    jp: '起きる',
    kana: 'おきる',
    ro: 'okiru',
    type: 'verb',
    etc: {
      stemjp: '起',
      stemro: 'oki',
      endingjp: 'る',
      endingro: 'ru',
      form: 2,
      exception: false,
    },
  },
  {
    id: '',
    language: 'japanese',
    ko: '죽다',
    jp: '死ぬ',
    kana: 'しぬ',
    ro: 'shinu',
    type: 'verb',
    etc: {
      stemjp: '死',
      stemro: 'shi',
      endingjp: 'ぬ',
      endingro: 'nu',
      form: 1,
      exception: false,
    },
  },
];

export const hiragana = {
  a: [
    { jp: 'あ', ro: 'a', ko: '아' },
    { jp: 'い', ro: 'i', ko: '이' },
    { jp: 'う', ro: 'u', ko: '우' },
    { jp: 'え', ro: 'e', ko: '에' },
    { jp: 'お', ro: 'o', ko: '오' },
  ],
  ka: [
    { jp: 'か', ro: 'ka', ko: '카' },
    { jp: 'き', ro: 'ki', ko: '키' },
    { jp: 'く', ro: 'ku', ko: '쿠' },
    { jp: 'け', ro: 'ke', ko: '케' },
    { jp: 'こ', ro: 'ko', ko: '코' },
  ],
  sa: [
    { jp: 'さ', ro: 'sa', ko: '사' },
    { jp: 'し', ro: 'shi', ko: '시' },
    { jp: 'す', ro: 'su', ko: '스' },
    { jp: 'せ', ro: 'se', ko: '세' },
    { jp: 'そ', ro: 'so', ko: '소' },
  ],
  ta: [
    { jp: 'た', ro: 'ta', ko: '타' },
    { jp: 'ち', ro: 'chi', ko: '치' },
    { jp: 'つ', ro: 'tsu', ko: '츠' },
    { jp: 'っ', ro: 't', ko: '츠' },
    { jp: 'て', ro: 'te', ko: '테' },
    { jp: 'と', ro: 'to', ko: '토' },
  ],
  na: [
    { jp: 'な', ro: 'na', ko: '나' },
    { jp: 'に', ro: 'ni', ko: '니' },
    { jp: 'ぬ', ro: 'nu', ko: '누' },
    { jp: 'ね', ro: 'ne', ko: '네' },
    { jp: 'の', ro: 'no', ko: '노' },
  ],
  ha: [
    { jp: 'は', ro: 'ha', ko: '하' },
    { jp: 'ひ', ro: 'hi', ko: '히' },
    { jp: 'ふ', ro: 'fu', ko: '후' },
    { jp: 'へ', ro: 'he', ko: '헤' },
    { jp: 'ほ', ro: 'ho', ko: '호' },
  ],
  ma: [
    { jp: 'ま', ro: 'ma', ko: '마' },
    { jp: 'み', ro: 'mi', ko: '미' },
    { jp: 'む', ro: 'mu', ko: '무' },
    { jp: 'め', ro: 'me', ko: '메' },
    { jp: 'も', ro: 'mo', ko: '모' },
  ],
  ya: [
    { jp: 'や', ro: 'ya', ko: '야' },
    { jp: 'ゆ', ro: 'yu', ko: '유' },
    { jp: 'よ', ro: 'yo', ko: '요' },
  ],
  ra: [
    { jp: 'ら', ro: 'ra', ko: '라' },
    { jp: 'り', ro: 'ri', ko: '리' },
    { jp: 'る', ro: 'ru', ko: '루' },
    { jp: 'れ', ro: 're', ko: '레' },
    { jp: 'ろ', ro: 'ro', ko: '로' },
  ],
  wa: [
    { jp: 'わ', ro: 'wa', ko: '와' },
    { jp: 'を', ro: 'wo', ko: '오' },
    { jp: 'ん', ro: 'n', ko: '은/는' },
  ],
  ga: [
    { jp: 'が', ro: 'ga', ko: '가' },
    { jp: 'ぎ', ro: 'gi', ko: '기' },
    { jp: 'ぐ', ro: 'gu', ko: '구' },
    { jp: 'げ', ro: 'ge', ko: '게' },
    { jp: 'ご', ro: 'go', ko: '고' },
  ],
  za: [
    { jp: 'ざ', ro: 'za', ko: '자' },
    { jp: 'じ', ro: 'ji', ko: '지' },
    { jp: 'ず', ro: 'zu', ko: '즈' },
    { jp: 'ぜ', ro: 'ze', ko: '제' },
    { jp: 'ぞ', ro: 'zo', ko: '조' },
  ],
  da: [
    { jp: 'だ', ro: 'da', ko: '다' },
    { jp: 'ぢ', ro: 'ji', ko: '지' },
    { jp: 'づ', ro: 'zu', ko: '즈' },
    { jp: 'で', ro: 'de', ko: '데' },
    { jp: 'ど', ro: 'do', ko: '도' },
  ],
  ba: [
    { jp: 'ば', ro: 'ba', ko: '바' },
    { jp: 'び', ro: 'bi', ko: '비' },
    { jp: 'ぶ', ro: 'bu', ko: '부' },
    { jp: 'べ', ro: 'be', ko: '베' },
    { jp: 'ぼ', ro: 'bo', ko: '보' },
  ],
  pa: [
    { jp: 'ぱ', ro: 'pa', ko: '파' },
    { jp: 'ぴ', ro: 'pi', ko: '피' },
    { jp: 'ぷ', ro: 'pu', ko: '푸' },
    { jp: 'ぺ', ro: 'pe', ko: '페' },
    { jp: 'ぽ', ro: 'po', ko: '포' },
  ],
};

export const katakana = {
  a: [
    { jp: 'ア', ro: 'a', ko: '아' },
    { jp: 'イ', ro: 'i', ko: '이' },
    { jp: 'ウ', ro: 'u', ko: '우' },
    { jp: 'エ', ro: 'e', ko: '에' },
    { jp: 'オ', ro: 'o', ko: '오' },
  ],
  ka: [
    { jp: 'カ', ro: 'ka', ko: '카' },
    { jp: 'キ', ro: 'ki', ko: '키' },
    { jp: 'ク', ro: 'ku', ko: '쿠' },
    { jp: 'ケ', ro: 'ke', ko: '케' },
    { jp: 'コ', ro: 'ko', ko: '코' },
  ],
  sa: [
    { jp: 'サ', ro: 'sa', ko: '사' },
    { jp: 'シ', ro: 'shi', ko: '시' },
    { jp: 'ス', ro: 'su', ko: '스' },
    { jp: 'セ', ro: 'se', ko: '세' },
    { jp: 'ソ', ro: 'so', ko: '소' },
  ],
  ta: [
    { jp: 'タ', ro: 'ta', ko: '타' },
    { jp: 'チ', ro: 'chi', ko: '치' },
    { jp: 'ツ', ro: 'tsu', ko: '츠' },
    { jp: 'テ', ro: 'te', ko: '테' },
    { jp: 'ト', ro: 'to', ko: '토' },
  ],
  na: [
    { jp: 'ナ', ro: 'na', ko: '나' },
    { jp: 'ニ', ro: 'ni', ko: '니' },
    { jp: 'ヌ', ro: 'nu', ko: '누' },
    { jp: 'ネ', ro: 'ne', ko: '네' },
    { jp: 'ノ', ro: 'no', ko: '노' },
  ],
  ha: [
    { jp: 'ハ', ro: 'ha', ko: '하' },
    { jp: 'ヒ', ro: 'hi', ko: '히' },
    { jp: 'フ', ro: 'fu', ko: '후' },
    { jp: 'ヘ', ro: 'he', ko: '헤' },
    { jp: 'ホ', ro: 'ho', ko: '호' },
  ],
  ma: [
    { jp: 'マ', ro: 'ma', ko: '마' },
    { jp: 'ミ', ro: 'mi', ko: '미' },
    { jp: 'ム', ro: 'mu', ko: '무' },
    { jp: 'メ', ro: 'me', ko: '메' },
    { jp: 'モ', ro: 'mo', ko: '모' },
  ],
  ya: [
    { jp: 'ヤ', ro: 'ya', ko: '야' },
    { jp: 'ユ', ro: 'yu', ko: '유' },
    { jp: 'ヨ', ro: 'yo', ko: '요' },
  ],
  ra: [
    { jp: 'ラ', ro: 'ra', ko: '라' },
    { jp: 'リ', ro: 'ri', ko: '리' },
    { jp: 'ル', ro: 'ru', ko: '루' },
    { jp: 'レ', ro: 're', ko: '레' },
    { jp: 'ロ', ro: 'ro', ko: '로' },
  ],
  wa: [
    { jp: 'ワ', ro: 'wa', ko: '와' },
    { jp: 'ヲ', ro: 'wo', ko: '오' },
    { jp: 'ン', ro: 'n', ko: '은/는' },
  ],
  ga: [
    { jp: 'ガ', ro: 'ga', ko: '가' },
    { jp: 'ギ', ro: 'gi', ko: '기' },
    { jp: 'グ', ro: 'gu', ko: '구' },
    { jp: 'ゲ', ro: 'ge', ko: '게' },
    { jp: 'ゴ', ro: 'go', ko: '고' },
  ],
  za: [
    { jp: 'ザ', ro: 'za', ko: '자' },
    { jp: 'ジ', ro: 'ji', ko: '지' },
    { jp: 'ズ', ro: 'zu', ko: '즈' },
    { jp: 'ゼ', ro: 'ze', ko: '제' },
    { jp: 'ゾ', ro: 'zo', ko: '조' },
  ],
  da: [
    { jp: 'ダ', ro: 'da', ko: '다' },
    { jp: 'ヂ', ro: 'ji', ko: '지' },
    { jp: 'ヅ', ro: 'zu', ko: '즈' },
    { jp: 'デ', ro: 'de', ko: '데' },
    { jp: 'ド', ro: 'do', ko: '도' },
  ],
  ba: [
    { jp: 'バ', ro: 'ba', ko: '바' },
    { jp: 'ビ', ro: 'bi', ko: '비' },
    { jp: 'ブ', ro: 'bu', ko: '부' },
    { jp: 'ベ', ro: 'be', ko: '베' },
    { jp: 'ボ', ro: 'bo', ko: '보' },
  ],
  pa: [
    { jp: 'パ', ro: 'pa', ko: '파' },
    { jp: 'ピ', ro: 'pi', ko: '피' },
    { jp: 'プ', ro: 'pu', ko: '푸' },
    { jp: 'ペ', ro: 'pe', ko: '페' },
    { jp: 'ポ', ro: 'po', ko: '포' },
  ],
};

// export const onConvert = (data: Verb) => {
//   const _logic: any = logic.find(({ type = '' }) => type === 'present');

//   const { form = 0, endingro = '', stemjp = '' } = data;

//   const good = _logic['value'][form];
//   const a = good[endingro];

//   const romaji = _logic['value'][form][endingro].split('_');

//   let result = '';
//   romaji.map((o: string) => {
//     Object.values(hiragana).forEach((data) => {
//       const { jp = '' } = data.find(({ ro: _ro }) => _ro === o) || {};
//       if (jp) result += jp;
//     });
//   });
//   return result;
// };
