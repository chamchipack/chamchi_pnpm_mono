'use client';

import DrawerForm from '@/components/common/backdrop/DrawerForm';
import useLockBodyScroll from '@/config/utils/hooks/useLockBodyScroll';
import { CheckCircle, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import DrawerInputForm from './DrawerInputForm';

interface Props {
  data: {
    keyname: string;
    label: string;
    value: string;
    placeholder?: string;
    isMaxLengthOn?: boolean;
    type?: 'text' | 'mobile';
  }[];
  onClick?: () => void;
  isLabelVisable: boolean;
  type: 'text';
  inputRequestTitle?: string;
}

const InputClickableBox = ({
  data = [],
  onClick,
  isLabelVisable = false,
  type = 'text',
  inputRequestTitle = '',
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const [inputValues, setInputValues] = useState<Record<string, string>>(
    data.reduce((acc, item) => ({ ...acc, [item.keyname]: item.value }), {}),
  );

  const onClose = () => setOpen(false);

  const isInputEmpty = (input: any, value: any) =>
    !input && !value ? 'text-gray-400' : 'text-gray-900';

  useLockBodyScroll(open);

  return (
    <>
      <div
        className="flex flex-row border border-black/20 rounded-xl p-4 relative hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-between w-full">
          <div className="w-[95%] flex flex-col gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-900 max-w-9/10">
                  {item.value || item.placeholder}
                </span>
                {isLabelVisable ? (
                  <span
                    className={`text-sm font-bold max-w-[150px] truncate ${isInputEmpty(
                      inputValues[item.keyname],
                      item.value,
                    )}`}
                  >
                    {inputValues[item.keyname] ||
                      item.value ||
                      item.placeholder}
                  </span>
                ) : (
                  <>
                    {inputValues[item.keyname] || selectedCoupon ? (
                      <CheckCircle size={16} className="text-blue-500" />
                    ) : null}
                  </>
                )}
              </div>
            ))}
          </div>

          <ChevronRight
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <DrawerForm
        open={open}
        onClose={onClose}
        minHeight="40vh"
        maxHeight="60vh"
        onOpen={() => setOpen(false)}
      >
        {type === 'text' && (
          <DrawerInputForm
            data={data}
            inputValues={inputValues}
            setInputValues={setInputValues}
            onClose={onClose}
            title={inputRequestTitle}
          />
        )}
      </DrawerForm>
    </>
  );
};

export default React.memo(InputClickableBox);
