import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const defaultValue = 1;

interface Parameter {
  'language.like'?: string;
  'type.like'?: string;
  'id.or'?: string[];
}

const parameters: Parameter = {};

export const ParametersAtom = atom<Parameter>({
  key: 'ParametersAtom',
  default: parameters,
});

export const PaginationAtom = atom<number>({
  key: 'PaginationAtom',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
