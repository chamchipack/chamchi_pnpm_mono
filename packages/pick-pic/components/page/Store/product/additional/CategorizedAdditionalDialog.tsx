'use client';

import CommonSwipeableDrawer from '@/components/common/backdrop/CommonSwipeableDrawer';
import { additionalProductAtom } from '@/store/orderStore/additional';
import { selectedProductAtom } from '@/store/orderStore/order-info';
import Dialog from '@mui/material/Dialog';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  onCheckProduct: (value: boolean) => void;
}

const CategorizedAdditionalDialog = ({
  open,
  onClose,
  onOpen,
  onCheckProduct,
}: Props) => {
  const additionalProduct = useRecoilValue(additionalProductAtom);
  const [selectedOption, setSelectedOption] = useState<
    AdditionalProductSchema[]
  >([]);
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);
  const [productCounts, setProductCounts] = useState<Record<string, number>>(
    {},
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [categorized, setCategorized] = useState<
    Record<string, AdditionalProductSchema[]>
  >({});

  useEffect(() => {
    if (additionalProduct) {
      const categorized = additionalProduct.reduce(
        (acc, item) => {
          const category = item.category || '기타';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item as any);
          return acc;
        },
        {} as Record<string, AdditionalProductSchema[]>,
      );

      setCategorized(categorized);
      setExpandedCategories(
        Object.keys(categorized).reduce(
          (acc, key) => {
            acc[key] = false;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );
    }

    setSelectedOption(additionalProduct as AdditionalProductSchema[]);
    if (additionalProduct && additionalProduct.length) onCheckProduct(true);
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
      <CommonSwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        minHeight="60vh"
        maxHeight="70vh"
      >
        <div className="px-4">
          <div className="w-[50px] h-[5px] bg-gray-300 rounded-full mx-auto mt-2 mb-4" />
          <h2 className="text-base font-semibold mb-4">
            이런 상품들은 어떠세요?
          </h2>

          {Object.entries(categorized).map(([category, products]) => {
            const isExpanded = expandedCategories[category];

            return (
              <div key={category} className="mb-6">
                <div
                  className={`flex justify-between items-center px-4 py-2 rounded-md bg-gray-100 cursor-pointer transition-colors`}
                  onClick={() =>
                    setExpandedCategories((prev) => ({
                      ...prev,
                      [category]: !prev[category],
                    }))
                  }
                >
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <span className="w-2 h-2 rounded-sm bg-main" />
                    {category}
                  </h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <span>{isExpanded ? '숨기기' : '펼치기'}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'max-h-[1000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-4 pt-4">
                    {products.map((product) => {
                      const count = productCounts[product._id] || 0;
                      const totalPrice = count * product.price;

                      return (
                        <div
                          key={product._id}
                          className="flex items-center justify-between gap-4"
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
                                <p className="text-sm font-bold truncate">
                                  {product.name}
                                </p>
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
                                    handleConfirm(
                                      product._id,
                                      count + 1,
                                      product,
                                    )
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
                                  count > 0
                                    ? 'visible text-gray-800'
                                    : 'invisible'
                                }`}
                              >
                                {count}개 · {totalPrice.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CommonSwipeableDrawer>

      <Dialog open={!!previewImage} onClose={() => setPreviewImage(null)}>
        <img src={previewImage || ''} className="w-full h-auto" />
      </Dialog>
    </>
  );
};

export default React.memo(CategorizedAdditionalDialog);
