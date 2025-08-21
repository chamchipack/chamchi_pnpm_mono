'use client';

import { SocialProviderEnum } from '@/types/enums/enums';
import { Link } from 'lucide-react';

enum Provider {
  kakao = '카카오',
  apple = '애플',
}

interface Props {
  provider: SocialProviderEnum.kakao | SocialProviderEnum.apple | string;
}

const providerStyles: Record<
  string,
  { label: string; bgColor: string; textColor: string }
> = {
  kakao: { label: Provider.kakao, bgColor: '#FEE500', textColor: '#000000' },
  apple: { label: Provider.apple, bgColor: '#000000', textColor: '#FFFFFF' },
};

export default function ProviderBox({ provider }: Props) {
  const style = providerStyles[provider] ?? {
    label: provider,
    bgColor: '#E0E0E0',
    textColor: '#000000',
  };

  if (!provider) return null;

  return (
    <div className="flex justify-center items-center gap-1 text-xs font-medium">
      <Link className="w-4 h-4 text-blue-600" />
      <span
        className="px-4 py-1 rounded-full"
        style={{ backgroundColor: style.bgColor, color: style.textColor }}
      >
        {style.label}
      </span>
    </div>
  );
}
