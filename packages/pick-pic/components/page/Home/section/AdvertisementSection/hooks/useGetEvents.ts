import { useEvents } from '../fetch';

export default async function useGetEvents() {
  const { data } = await useEvents({
    page: 1,
    limit: 5,
  });

  const { items = [] } = data || {};

  if (!items.length) return { items: [], imageArray: [] };

  const imageArray = items.map(({ images }) => {
    const [image] = images;
    return image;
  });

  return { imageArray, items };
}
