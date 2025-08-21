'use client';

interface Props {
  current: number;
  total: number;
}

export default function SlideIndicator({ current, total }: Props) {
  return (
    <div className="absolute bottom-2 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
      {current} / {total}
    </div>
  );
}
