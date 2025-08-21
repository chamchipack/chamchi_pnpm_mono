'use client';

import { Loader2 } from 'lucide-react';

export default function BackDrop({ text = '' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin w-6 h-6 text-white" />
      {text && <p className="mt-2 text-white text-sm font-medium">{text}</p>}
    </div>
  );
}
