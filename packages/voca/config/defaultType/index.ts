export type Language = 'japanese' | 'english';

export type Collection = 'japanese' | 'word_like' | 'vocabulary';

export interface Example {
  jp: string;
  ko: string;
}

export interface Noun {}
export interface Adj {}
export interface Adv {}
export interface Etc {}

export interface Verb {
  stemjp: string;
  stemro: string;
  endingjp: string;
  endingro: string;
  form?: number;
  exception: boolean;
}

export type TypeGbn = 'verb' | 'noun' | 'adv' | 'adj';

export const typeGbn: { [key in TypeGbn]: string } = {
  verb: '동사',
  noun: '명사',
  adv: '부사',
  adj: '형용사',
};

export interface Word<T> {
  id: string;
  ko: string;
  jp: string;
  kana: string;
  ro: string;
  type: TypeGbn;
  language: string;
  etc?: T extends Verb ? T : {};
  example?: Example[];
}

export interface Vocabulary {
  name: string;
  userId: string;
  wordId: string[];
  language: Language;
}

export type WordBase = Verb | Noun | Adj | Adv | Etc;
