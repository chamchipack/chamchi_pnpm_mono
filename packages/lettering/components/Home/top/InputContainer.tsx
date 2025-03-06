'use client';

import SearchInput from '@/components/common/input/SearchInput';
import { handleNavigation } from '@/config/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InputContainer() {
  const router = useRouter();

  const [query, setQuery] = useState('');

  const handleRouter = () => {
    let path = '/application/search';
    const isWebView = handleNavigation({
      path: 'search',
      status: 'forward',
    });

    if (!isWebView) return router.push(path);
  };

  return (
    <>
      <SearchInput
        isClickAllowed={false}
        placeholder="예약가능한 곳을 찾아보세요!"
        fieldColor="#fff"
        isRecentSearchAllowed={false}
        handleClickRouter={handleRouter}
        query={query}
        setQuery={setQuery}
      />
    </>
  );
}
