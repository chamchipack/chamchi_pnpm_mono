'use client';

import CommonImage from '@/components/common/image/CommonImage';

interface Props {
  src: string;
  alt: string;
}

export default function BannerSlide({ src, alt }: Props) {
  return <CommonImage src={src} alt={alt} width="100%" height="160px" />;
}
