'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import InputMobile from './InputMobile';
import InputTextField from './InputTextField';

interface DrawerInputFormProps {
  open: boolean;
  data: {
    keyname: string;
    label: string;
    value: string;
    placeholder?: string;
    isMaxLengthOn?: boolean;
    type?: 'mobile' | 'text';
  }[];
  inputValues: Record<string, string>;
  setInputValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onClose: () => void;
  title: string;
  placeholder?: string;
}

export default function DrawerInputForm({
  open,
  data,
  inputValues,
  setInputValues,
  onClose,
  title = '',
  placeholder = '',
}: DrawerInputFormProps) {
  const [orderinfo, setOrderInfo] = useRecoilState(selectedProductAtom);
  const [value, setValue] = useState(inputValues);

  useEffect(() => {
    setValue(inputValues);
  }, [open]);

  const handleInputChange = (keyname: string, newValue: string) => {
    setInputValues((prev) => ({
      ...prev,
      [keyname]: newValue,
    }));

    setOrderInfo((prev: any) => ({
      ...prev,
      [keyname]: newValue,
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center px-4 pt-2">
          <p className="font-bold text-base">{title || '가게 요청사항'}</p>
          <button
            onClick={() => {
              setValue(inputValues);
              onClose();
            }}
            className="p-1"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Input Fields */}
        <div className="px-4">
          {data.map((item, index) => (
            <div key={index} className="mt-4">
              <label className="block text-sm font-bold mb-1">
                {item.label}
              </label>
              {item?.type === 'mobile' ? (
                <InputMobile
                  value={value[item.keyname]}
                  setValue={(newValue) =>
                    setValue((prev) => ({
                      ...prev,
                      [item.keyname]: newValue,
                    }))
                  }
                  placeholder={item.placeholder || '문구를 입력해주세요'}
                  isMaxLengthOn={item?.isMaxLengthOn}
                />
              ) : (
                <InputTextField
                  value={value[item.keyname]}
                  setValue={(newValue) =>
                    setValue((prev) => ({
                      ...prev,
                      [item.keyname]: newValue,
                    }))
                  }
                  placeholder={item.placeholder || '문구를 입력해주세요'}
                  isMaxLengthOn={item?.isMaxLengthOn}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-4 pb-4">
        <button
          className="w-full h-10 bg-main text-white rounded-md"
          onClick={() => {
            data.forEach((item) => {
              handleInputChange(item.keyname, value[item.keyname]);
            });
            onClose();
          }}
        >
          완료
        </button>
      </div>
    </div>
  );
}
