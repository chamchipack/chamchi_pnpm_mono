import { Dayjs } from 'dayjs';

export type PageProps = {
  isFilterVisable: boolean;
  isBackwardVisable: boolean;
  isTimeSelectable: boolean;
  placeholder?: string;
  isTimeForPast?: boolean;
  isClickAllowed: boolean;
  autoSearched?: boolean;
  params?: {
    query: string;
    date: Dayjs | null;
  };
};
// type FilterValue = '' | 'popular' | 'rating' | 'review' | 'bookmark';
// export type Filter = { value: FilterValue; label: string };

// export const filterOptions: Filter[] = [
//   { value: '', label: '기본순' },
//   { value: 'popular', label: '인기순' },
//   { value: 'rating', label: '평점 좋은 순' },
//   { value: 'review', label: '리뷰 많은 순' },
//   { value: 'bookmark', label: '찜 많은 순' },
// ];
