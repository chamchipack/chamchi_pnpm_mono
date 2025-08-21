'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  seller: SellerSchema;
}

const ParcelSelector = ({ seller }: Props) => {
  const [selectedDate, setDateSelection] = useRecoilState(dateSelectionAtom);
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);

  const [isParcelSelected, setIsParcelSelected] = useState(false);
  const [customInputs, setCustomInputs] = useState({
    parcelLocation: '',
    parcelLocationDetail: '',
  });

  useEffect(() => {
    setIsParcelSelected(orderInfo?.isParcelAvailable ?? false);

    if (orderInfo?.parcelLocation || orderInfo?.parcelLocationDetail) {
      setCustomInputs({
        parcelLocation: orderInfo.parcelLocation ?? '',
        parcelLocationDetail: orderInfo.parcelLocationDetail ?? '',
      });
    }
  }, []);

  const handleToggle = () => {
    setIsParcelSelected((prev) => {
      const next = !prev;

      setOrderInfo((prev: any) => ({
        ...prev,
        isParcelAvailable: next,
        parcelLocation: next ? customInputs.parcelLocation : null,
        parcelLocationDetail: next ? customInputs.parcelLocationDetail : null,
        parcelFee: next ? seller.parcelFee : 0,
      }));

      if (!next) {
        setCustomInputs({
          parcelLocation: '',
          parcelLocationDetail: '',
        });
      }
      setDateSelection(null); // 선택된 날짜 초기화

      return next;
    });
  };

  // const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;

  //   setCustomInputs((prev) => ({
  //     ...prev,
  //     parcelLocation: value,
  //   }));

  //   setOrderInfo((prev: any) => ({
  //     ...prev,
  //     parcelLocation: value,
  //   }));
  // };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    setCustomInputs((prev) => ({
      ...prev,
      parcelLocationDetail: value,
    }));

    setOrderInfo((prev: any) => ({
      ...prev,
      parcelLocationDetail: value,
    }));
  };

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !wrapRef.current || !window.daum) return;

    const postcode = new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddress = data.address;
        setCustomInputs((prev) => ({
          ...prev,
          parcelLocation: fullAddress,
        }));

        setOrderInfo((prev: any) => ({
          ...prev,
          parcelLocation: fullAddress,
        }));
        setOpen(false);
        // window.ReactNativeWebView?.postMessage(fullAddress); // RN WebView 지원 시
      },
      width: '100%',
      height: '100%',
    });

    postcode.embed(wrapRef.current);

    return () => {
      if (wrapRef.current) {
        wrapRef.current.innerHTML = '';
      }
    };
  }, [open]);

  return (
    <>
      <div className="flex justify-between items-center mt-4 mb-2 px-4">
        <p className="text-sm font-semibold">택배여부 선택</p>
        <button
          type="button"
          onClick={handleToggle}
          className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
            isParcelSelected ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
              isParcelSelected ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md h-[500px] rounded-md shadow-lg overflow-visible">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-2 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500 hover:text-gray-700 shadow"
            >
              ✕
            </button>
            <div ref={wrapRef} className="w-full h-full" />
          </div>
        </div>
      )}

      {isParcelSelected && (
        <div className="px-4 space-y-2">
          <button
            onClick={() => setOpen(true)}
            className="w-full py-2 bg-blue-500 text-white rounded-lg shadow transition-colors"
          >
            📍 주소 검색
          </button>
          {/* <input
            type="text"
            placeholder="주소를 입력하세요"
            value={customInputs.parcelLocation}
            onChange={handleAddressChange}
            className="w-full h-10 px-3 rounded-md bg-gray-100 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}

          {customInputs.parcelLocation && (
            <>
              <div className="mt-2">
                <p className="text-sm text-gray-700 bg-gray-100 rounded-md px-3 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="font-semibold text-gray-800">
                    입력된 주소:
                  </span>{' '}
                  {customInputs.parcelLocation}
                </p>
              </div>

              <input
                type="text"
                placeholder="상세 주소를 입력하세요"
                value={customInputs.parcelLocationDetail}
                onChange={handleDetailAddressChange}
                className="w-full h-10 px-3 rounded-md bg-gray-100 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(ParcelSelector);
