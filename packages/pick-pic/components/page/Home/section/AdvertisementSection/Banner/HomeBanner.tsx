'use client';

import { useSwipeable } from 'react-swipeable';
import BannerSlide from './BannerSlide';
import SlideIndicator from './SlideIndicator';
import { useBannerSlider } from './hooks/useBannerSlider';

interface Props {
  images: string[];
}

export default function HomeBanner({ images }: Props) {
  const { index, nextSlide, prevSlide, isSingle, resetAutoSlide } =
    useBannerSlider(images);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      nextSlide();
      resetAutoSlide();
    },
    onSwipedRight: () => {
      prevSlide();
      resetAutoSlide();
    },
    trackMouse: true,
  });

  if (isSingle) return <BannerSlide src={images[0]} alt="Banner" />;

  return (
    <div
      {...handlers}
      className="relative w-full h-[160px] overflow-hidden mx-auto"
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${(i - index) * 100}%)` }}
        >
          <BannerSlide src={src} alt={`Banner ${i + 1}`} />
        </div>
      ))}

      <div className="absolute left-0 top-0 w-[40%] h-full z-10" />
      <div className="absolute right-0 top-0 w-[40%] h-full z-10" />

      <SlideIndicator current={index + 1} total={images.length} />
    </div>
  );
}
