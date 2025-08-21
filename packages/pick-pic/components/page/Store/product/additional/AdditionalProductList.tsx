// 삭제예정
'use client';

import { additionalProductAtom } from '@/store/orderStore/additional';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import { Dialog } from '@mui/material'; // ✅ 유지
import { Minus, Plus } from 'lucide-react'; // ✅ 아이콘 변경
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function AdditionalProductList() {
  const additionalProduct = useRecoilValue(additionalProductAtom);
  const [selectedOption, setSelectedOption] = useState<
    AdditionalProductSchema[]
  >([]);
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);
  const [productCounts, setProductCounts] = useState<Record<string, number>>(
    {},
  );
  const [visibleCount, setVisibleCount] = useState(5);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(additionalProduct as AdditionalProductSchema[]);
  }, [additionalProduct]);

  useEffect(() => {
    if (!orderInfo?.additionalProduct) return;
    const counts: Record<string, number> = {};
    Object.entries(orderInfo.additionalProduct).forEach(
      ([productId, data]: any) => {
        counts[productId] = data.count;
      },
    );
    setProductCounts(counts);
  }, [orderInfo?.additionalProduct]);

  if (!selectedOption?.length || !selectedOption[0]?._id) return null;

  const handleConfirm = (
    productId: string,
    count: number,
    product: AdditionalProductSchema,
  ) => {
    setProductCounts((prev) => ({ ...prev, [productId]: count }));

    setOrderInfo((prev: any) => {
      const prevAdditional = prev.additionalProduct || {};
      const prevCount = prevAdditional[productId]?.count || 0;
      const updatedAdditional = { ...prevAdditional };

      if (count === 0) {
        delete updatedAdditional[productId];
      } else {
        updatedAdditional[productId] = {
          name: product.name,
          price: product.price,
          count,
        };
      }

      const prevTotal = prev.totalPrice || 0;
      const diff = (count - prevCount) * product.price;
      const newTotal = Math.max(prevTotal + diff, 0);

      return {
        ...prev,
        additionalProduct:
          Object.keys(updatedAdditional).length > 0 ? updatedAdditional : null,
        totalPrice: newTotal,
        price: newTotal,
      };
    });
  };

  return (
    <>
      <div className="px-4">
        <div className="my-4">
          <h2 className="text-base font-semibold">추가상품</h2>
        </div>

        {selectedOption.slice(0, visibleCount).map((product) => {
          const count = productCounts[product._id] || 0;
          const totalPrice = count * product.price;

          return (
            <div
              key={product._id}
              className="flex items-center justify-between gap-4 mb-4"
            >
              <img
                src={product.image || '/fallback.png'}
                alt={product.name}
                onClick={() =>
                  setPreviewImage(product.image || '/fallback.png')
                }
                className="w-20 h-20 rounded object-cover cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="max-w-[120px]">
                    <p className="text-sm font-bold truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleConfirm(
                          product._id,
                          Math.max(0, count - 1),
                          product,
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2">{count}</span>
                    <button
                      onClick={() =>
                        handleConfirm(product._id, count + 1, product)
                      }
                      className="w-6 h-6 flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="h-5">
                  <p
                    className={`mt-1 text-sm text-start ${
                      count > 0 ? 'visible text-gray-800' : 'invisible'
                    }`}
                  >
                    {count}개 · {totalPrice.toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {visibleCount < selectedOption.length && (
          <div className="text-center my-4">
            <p
              className="text-sm text-gray-500 cursor-pointer"
              onClick={() => setVisibleCount((prev) => prev + 5)}
            >
              더보기
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!previewImage} onClose={() => setPreviewImage(null)}>
        <img src={previewImage || ''} className="w-full h-auto" />
      </Dialog>
    </>
  );
}
