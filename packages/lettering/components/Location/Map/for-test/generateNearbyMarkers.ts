type MarkersDummy = {
  _id: string;
  name: string;
  longitude: number;
  latitude: number;
};

export const generateNearbyMarkers = (
  latitude: number,
  longitude: number,
  count = 4,
): MarkersDummy[] => {
  const offset = 0.001; // 마커를 조금씩 떨어뜨리기 위한 값 (약 100m)

  return [
    {
      _id: 'marker1',
      name: '주변 마커 1',
      latitude: latitude + offset,
      longitude: longitude + offset,
    },
    {
      _id: 'marker2',
      name: '주변 마커 2',
      latitude: latitude - offset,
      longitude: longitude + offset,
    },
    {
      _id: 'marker3',
      name: '주변 마커 3',
      latitude: latitude + offset,
      longitude: longitude - offset,
    },
    {
      _id: 'marker4',
      name: '주변 마커 4',
      latitude: latitude - offset,
      longitude: longitude - offset,
    },
  ];
};

export const dummy: MarkersDummy[] = [
  {
    _id: 'id1',
    name: '세븐일레븐',
    longitude: 127.128146,
    latitude: 37.440048249,
  },
  { _id: 'id2', name: 'GS25', longitude: 127.1272, latitude: 37.4401 },
  {
    _id: 'id3',
    name: '배스킨라빈스',
    longitude: 127.12852,
    latitude: 37.44016,
  },
  { _id: 'id4', name: '핑크네일', longitude: 127.12802, latitude: 37.44053 },
  { _id: 'id5', name: '잠실역', longitude: 127.102387, latitude: 37.513442 },
];
