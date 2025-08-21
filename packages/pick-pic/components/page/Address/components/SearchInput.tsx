'use client';

import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  handleSearchQuery?: (query: string) => void;
  isUsable: boolean;
  handleRouter?: () => void;
  placeholder?: string;
}

export default function SearchInput({
  handleSearchQuery,
  isUsable = true,
  handleRouter,
  placeholder,
}: SearchInputProps) {
  const [query, setQuery] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isUsable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUsable]);

  const handleSearch = () => {
    if (!isUsable) return;
    if (query.trim() && handleSearchQuery) {
      handleSearchQuery(query);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isUsable) return;
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full my-2">
      <div
        className={`flex items-center h-[45px] rounded-md border ${
          isUsable
            ? 'border-gray-300 focus-within:border-main'
            : 'border-gray-200'
        } transition-all bg-white`}
        onClick={() => {
          if (!isUsable && handleRouter) handleRouter();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 h-full text-base placeholder-gray-400 focus:outline-none"
          placeholder={placeholder ?? '검색어를 입력하세요'}
          readOnly={!isUsable}
          value={query}
          onChange={(e) => {
            if (!isUsable) return;
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={(e) => e.currentTarget.blur()}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-2 p-2 px-4 text-gray-500 hover:text-black"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
