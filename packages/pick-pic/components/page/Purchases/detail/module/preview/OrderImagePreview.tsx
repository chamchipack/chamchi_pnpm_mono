'use client';

import CommonImage from '@/components/common/image/CommonImage';
import { ImageIcon, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  name: string;
  image: string;
}

const OrderImagePreview = ({ name, image }: Props) => {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <>
      <div
        className="flex items-center gap-1 mt-1"
        onClick={() => setOpenImage(image)}
      >
        {image && <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" />}

        <p className="text-sm">{name}</p>
      </div>

      {openImage && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-80">
            {/* X 버튼 위치 개선 */}
            <button
              className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-black z-10"
              onClick={() => setOpenImage(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <CommonImage
              src={openImage}
              alt="옵션 이미지 미리보기"
              className="w-full h-auto rounded"
              rounded="rounded-md"
              height="h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderImagePreview;
