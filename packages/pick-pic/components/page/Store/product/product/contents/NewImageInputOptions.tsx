'use client';

import CommonImage from '@/components/common/image/CommonImage';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { ProductOptions } from '@/types/schema/ProductSchema';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

const MAX_SIZE_MB = 5;

type Props = {
  options: ProductOptions[];
  imageFiles: Record<string, File>;
  setImageFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>;
};

const NewImageInputOptions = ({
  options,
  imageFiles,
  setImageFiles,
}: Props) => {
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string | null>>(
    {},
  );

  // 🔧 input 요소들을 참조할 ref 객체
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!Object.keys(imageFiles).length) return;

    options.forEach((opt) => {
      const selected = orderInfo?.options?.[opt.title];
      const file = imageFiles?.[opt._id];

      if (selected?.type === 'image' && selected?._id === opt._id && file) {
        const url = URL.createObjectURL(file);
        setPreviewUrls((prev) => ({ ...prev, [opt._id]: url }));
      }
    });
  }, [options, orderInfo, imageFiles]);

  const handleImageChange = (
    file: File,
    title: string,
    _id: string,
    index: number,
  ) => {
    if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
      return alert('5MB 이하만 업로드 가능합니다.');
    }

    setImageFiles((prev) => ({
      ...prev,
      [_id]: file,
    }));

    setPreviewUrls((prev) => ({
      ...prev,
      [_id]: URL.createObjectURL(file),
    }));

    setOrderInfo((prev: any) => ({
      ...prev,
      options: {
        ...(prev?.options || {}),
        [title]: { value: 0, name: file.name, _id, type: 'image', index },
      },
    }));
  };

  return (
    <>
      {options.map((group, index) => {
        // const isEmpty = !orderInfo?.options?.[group.title];
        const isEmpty = !previewUrls[group?._id];

        return (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold">{group.title}</p>
              {isEmpty && (
                <p className="text-xs text-red-500">필수 입력값입니다</p>
              )}
            </div>

            <div
              className={`w-full h-[300px] rounded border border-gray-200 flex items-center justify-center relative overflow-hidden ${
                previewUrls[group._id] ? 'bg-transparent' : 'bg-gray-100'
              } cursor-pointer`}
              onClick={() =>
                document.getElementById(`image-input-${index}`)?.click()
              }
            >
              {previewUrls[group._id] ? (
                <>
                  <CommonImage
                    src={previewUrls[group._id] || ''}
                    alt="Selected"
                    width="100%"
                    height="100%"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      // 상태 제거
                      setImageFiles((prev) => {
                        const updated = { ...prev };
                        delete updated[group._id];
                        return updated;
                      });

                      setPreviewUrls((prev) => {
                        const updated = { ...prev };
                        delete updated[group._id];
                        return updated;
                      });

                      setOrderInfo((prev: any) => {
                        const updated = { ...(prev?.options || {}) };
                        delete updated[group.title];
                        return {
                          ...prev,
                          options: updated,
                        };
                      });

                      // ✅ input 초기화
                      const inputEl = inputRefs.current[group._id];
                      if (inputEl) inputEl.value = '';
                    }}
                    className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-500">이미지를 선택해주세요</p>
              )}

              <input
                ref={(el) => {
                  inputRefs.current[group._id] = el;
                }}
                id={`image-input-${index}`}
                type="file"
                accept="image/*"
                hidden
                disabled={!!previewUrls[group._id]}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    handleImageChange(file, group.title, group._id, index + 1);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(NewImageInputOptions);
