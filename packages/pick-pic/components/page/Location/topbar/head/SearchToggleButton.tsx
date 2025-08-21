'use client';
import { Search, X } from 'lucide-react';
import React from 'react';

interface Props {
  isSearching: boolean;
  onToggle: () => void;
}

const SearchToggleButton = ({ isSearching, onToggle }: Props) => {
  return (
    <div className="bg-white h-full flex items-center px-1">
      <button onClick={onToggle} className="p-1" aria-label="Toggle Search">
        {isSearching ? (
          <X size={24} className="text-gray-800" />
        ) : (
          <Search size={24} className="text-gray-800" />
        )}
      </button>
    </div>
  );
};

export default React.memo(SearchToggleButton);
