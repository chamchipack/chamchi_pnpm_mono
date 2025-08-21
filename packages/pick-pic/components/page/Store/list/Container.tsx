import { SearchFilterValue } from '@/types/schema/SearchSchema';
import SellerListInputContainer from './filter/SellerListInputContainer';
import ListContainer from './ListContainer';
import ProductListContainer from './product/ProductListContainer';
import SSR_StoreJsonldForProduct from './seo/SSR_StoreJsonldForProduct';
import SSR_StoreJsonldForSeller from './seo/SSR_StoreJsonldForSeller';

interface Props {
  params: {
    keyword: string;
    date: string | null;
    order?: SearchFilterValue;
    type?: string;
  };
}

export default function Container({ params }: Props) {
  return (
    <>
      <div className="pb-3 h-dvh overflow-auto">
        <div className="px-4 py-2 sticky top-0 border-b border-[#ededed] bg-white z-[888] w-full max-w-[YOUR_MAX_WIDTH] overflow-visible">
          <SellerListInputContainer
            isFilterVisable={true}
            isBackwardVisable={true}
            isTimeSelectable={true}
            params={params}
            isClickAllowed={true}
            autoSearched={true}
            placeholder="검색어를 입력해주세요"
          />
        </div>
        {params?.type === 'product' ? (
          <ProductListContainer params={params} />
        ) : (
          <ListContainer params={params} />
        )}
      </div>

      <SSR_StoreJsonldForSeller params={params} />
      <SSR_StoreJsonldForProduct params={params} />
    </>
  );
}
