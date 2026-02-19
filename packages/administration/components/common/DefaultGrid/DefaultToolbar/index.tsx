'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Info,
  Wrench,
  Trash2,
  FileSpreadsheet,
  Layers,
  Plus,
} from 'lucide-react';

interface Props {
  onClickRegister: () => void;
  rowId: string;
}

const baseBtn =
  'flex items-center gap-2 px-2 py-1 rounded-md border text-xs transition';

const DefaultToolbar = forwardRef(({ onClickRegister, rowId }: Props, ref) => {
  return (
    <>
      <div className="flex justify-end w-full mt-2 flex-wrap gap-2">
        <button
          className={`${baseBtn} border-green-500 text-green-600 hover:bg-green-50`}
        >
          <FileSpreadsheet size={16} />
          엑셀출력
        </button>

        {/* <button
          className={`${baseBtn} border-yellow-500 text-yellow-600 hover:bg-yellow-50`}
        >
          <Layers size={16} />
          일괄등록
        </button> */}

        <button
          className={`${baseBtn} border-blue-500 text-blue-600 hover:bg-blue-50`}
          onClick={onClickRegister}
        >
          <Plus size={16} />
          등록
        </button>

        {/* <button
          className={`${baseBtn} border-indigo-500 text-indigo-600 hover:bg-indigo-50`}
        >
          <Wrench size={16} />
          수정
        </button> */}

        <button
          className={`${baseBtn} border-red-500 text-red-600 hover:bg-red-50`}
          onClick={() => {
            console.log(rowId);
          }}
        >
          <Trash2 size={16} />
          삭제
        </button>
      </div>
    </>
  );
});

export default DefaultToolbar;
