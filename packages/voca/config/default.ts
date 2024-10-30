// word
// logic
// example 예문

interface Verb {
  stemjp: string;
  stemro: string;
  endingjp: string;
  endingro: string;
  form: number;
  exception: boolean;
}

interface Noun {}

interface Word<T> {
  id: string;
  ko: string;
  jp: string;
  kana: string;
  ro: string;
  type: 'verb' | 'noun' | 'adv' | 'adj';
  etc: T;
}

const nmi: Word<Noun> = {
  id: '',
  ko: '',
  jp: '',
  kana: '',
  ro: '',
  type: 'noun',
  etc: {},
};

export const good: Word<Verb>[] = [
  {
    id: '002',
    ko: '먹다',
    jp: '食べる',
    kana: 'たべる',
    ro: 'taberu',
    type: 'verb',
    etc: {
      stemjp: '食べ',
      stemro: 'tabe',
      endingjp: 'る',
      endingro: 'ru',
      form: 2, // indicative form
      exception: false,
    },
  },
  {
    id: '001',
    ko: '좋다',
    jp: '良い',
    kana: 'よい',
    ro: 'yoi',
    type: 'adj',
    etc: {
      stemjp: '良',
      stemro: 'yo',
      endingjp: 'い',
      endingro: 'i',
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
