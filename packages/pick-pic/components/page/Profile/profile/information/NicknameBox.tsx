'use client';
import { ChevronRight } from 'lucide-react';

interface Props {
  nickname: string;
  onClick: () => void;
}

export default function NicknameBox({ nickname, onClick }: Props) {
  return (
    <div className="flex justify-center mt-2">
      <div
        onClick={onClick}
        className="flex items-center gap-1 text-base font-semibold text-gray-900 cursor-pointer"
      >
        <span>{nickname}</span>
        <ChevronRight size={16} className="text-gray-500" />
      </div>
    </div>
  );
}
