import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

type AdditionalForm = Omit<AdditionalProductSchema, 'createdAt' | 'updatedAt'>;

const additionalProduct: AdditionalForm[] | null = null;

export const additionalProductAtom = atom<AdditionalForm[] | null>({
  key: 'additional-product',
  default: additionalProduct,
  effects_UNSTABLE: [persistAtom],
});
