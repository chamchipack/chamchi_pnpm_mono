'use client';

import { X } from 'lucide-react';
import React from 'react';

interface ListDrawerHeaderProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  clearSelection: () => void;
}

const ListDrawerHeader = ({
  drawerOpen,
  setDrawerOpen,
  clearSelection,
}: ListDrawerHeaderProps) => {
  return (
    <div className="flex items-center border-b border-gray-200 px-4 py-3">
      <p
        className="flex-1 text-sm font-semibold cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      >
        {drawerOpen ? '이 주변의 상점이에요!' : '여기를 눌러서 리스트 보기'}
      </p>

      {drawerOpen && (
        <button
          onClick={() => {
            setDrawerOpen(false);
            clearSelection();
          }}
          className="p-1 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default React.memo(ListDrawerHeader);
