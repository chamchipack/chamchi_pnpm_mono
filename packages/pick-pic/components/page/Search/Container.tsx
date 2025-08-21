import { usePopularSearches } from '@/api/server/server-api';
import { DataStructureKey } from '@/types/schema/default';
import SSR_SearchInputContainer from './input/SSR_SearchInputContainer';
import SSR_PopularSearches from './popular/SSR_PopularSearches';
import SSR_RecentSearches from './recent/SSR_RecentSearches';

export default async function Container() {
  const { data = [] } = await usePopularSearches<DataStructureKey.search>();
  const keywordRanks =
    data && Array.isArray(data) ? data.map(({ keyword }) => keyword) : [];

  return (
    <div className="py-4 px-4 pb-40">
      <SSR_SearchInputContainer />

      <div className="my-6">
        <SSR_PopularSearches keywords={keywordRanks || []} />
      </div>

      <div className="my-4">
        <SSR_RecentSearches />
      </div>
    </div>
  );
}
