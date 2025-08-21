import HeadComponent from '@/components/common/HeadComponent';
import InputContainer from './input/InputContainer';
import ListContainer from './list/ListContainer';

interface Props {
  userId: string;
  query: string;
  date: string;
}

export default function Container({ userId, query, date }: Props) {
  return (
    <div className="py-4 pb-24">
      {/* 헤더 */}
      <div className="px-4">
        <HeadComponent
          isLeftButtonVisable={false}
          title="주문내역"
          isRoutingReplace
        />
      </div>

      {/* 검색 입력창 */}
      <div className="px-4 mt-2">
        <InputContainer
          isFilterVisable={false}
          isBackwardVisable={false}
          isTimeSelectable={false}
          placeholder="가게 이름을 입력해보세요!"
          isTimeForPast={true}
          isClickAllowed
          autoSearched
          isRecentSearchAllowed={false}
          params={{ date, query }}
        />
      </div>

      {/* 리스트 */}
      <div className="px-4 mt-4">
        <ListContainer
          key={`${userId}-${query}-${date}`}
          userId={userId}
          query={query}
          date={date}
        />
      </div>
    </div>
  );
}
