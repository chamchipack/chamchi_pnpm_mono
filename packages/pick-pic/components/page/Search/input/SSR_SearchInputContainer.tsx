import CSR_SearchInputContainer from './CSR_SearchInputContainer';

const SSR_SearchInputContainer = () => {
  return (
    <div className="min-h-[80px]">
      <CSR_SearchInputContainer
        isFilterVisable={false}
        isBackwardVisable={false}
        isTimeSelectable={true}
        placeholder="가게 이름이나 주소를 입력해보세요!"
        isClickAllowed
      />
    </div>
  );
};

export default SSR_SearchInputContainer;
