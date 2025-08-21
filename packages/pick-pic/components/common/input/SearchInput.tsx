'use client';

import { useRecentSearches } from '@/config/utils/hooks/useRecentSearches';
import { Search, X } from 'lucide-react'; // lucide 아이콘 사용
import { useRouter } from 'next/navigation';

interface Props {
  isClickAllowed: boolean;
  isRecentSearchAllowed: boolean;
  placeholder?: string;
  query: string;
  setQuery: (query: string) => void;
  fieldColor?: string;
  handleSearch?: (query: string) => void;
  handleClickRouter?: () => void;
}

const SearchInput = ({
  isClickAllowed = false,
  isRecentSearchAllowed = false,
  placeholder = '검색어를 입력하세요',
  query = '',
  setQuery,
  fieldColor = 'bg-gray-100',
  handleSearch = () => {},
  handleClickRouter = () => {},
}: Props) => {
  const router = useRouter();
  const { addSearch } = useRecentSearches();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isClickAllowed) return;
    if (event.key === 'Enter' && query.trim()) {
      if (isRecentSearchAllowed) addSearch(query);
      handleSearch(query);
    }
  };

  const handleRouter = () => {
    if (!isClickAllowed) handleClickRouter();
  };

  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          if (isClickAllowed) setQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onClick={handleRouter}
        maxLength={50}
        readOnly={!isClickAllowed}
        className={`w-full h-10 pl-4 pr-10 text-base rounded-md ${fieldColor} placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-main`}
      />

      {/* End Adornment */}
      <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center space-x-1">
        {query && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuery('');
            }}
            className="text-gray-400 hover:text-gray-600 pr-2"
          >
            <X size={20} />
          </button>
        )}
        <button
          type="button"
          data-testid="search-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSearch(query);
          }}
          className="text-gray-500 hover:text-gray-700 pr-2"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
