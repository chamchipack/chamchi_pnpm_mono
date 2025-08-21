import CSR_PopularSearches from './CSR_PopularSearches';

interface Props {
  keywords: string[];
}

const SSR_PopularSearches = ({ keywords }: Props) => {
  return (
    <div className="min-h-[80px]">
      <CSR_PopularSearches keywords={keywords} />
    </div>
  );
};

export default SSR_PopularSearches;
