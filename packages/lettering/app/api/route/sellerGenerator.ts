import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';

const generateDummySeller = (
  index: number,
): StructuredDataSchemas[DataStructureKey.seller] => ({
  _id: `seller_${index}`,
  marketName: `가게이름${index}`,
  images: [
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
    'https://placehold.co/600x400',
  ],
  lat: 37.4 + Math.random() * 0.5, // 랜덤 좌표
  lng: 127.1 + Math.random() * 0.5,
  location: `서울특별시 가상구 가상로 ${index}길`,
  sellerName: `셀러${index}`,
  id: `seller${index}`,
  pw: `password${index}`,
  businessNumber: 10000000000 + index,
  mutualName: `상호명${index}`,
  startDay: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][index % 7],
  endDay: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][(index + 2) % 7],
  startTime: `${8 + (index % 4)}:00`,
  endTime: `${18 + (index % 4)}:00`,
  originalInfo: `정보${index}`,
  introduction: `소개글${index}`,
  openedAt: new Date(),
  closedAt: new Date(),
  mininumReservationDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const sellerList: StructuredDataSchemas[DataStructureKey.seller][] =
  Array.from({ length: 30 }, (_, i) => generateDummySeller(i + 1));
