'use client';

import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import DrawerForm from '@/components/common/backdrop/DrawerForm';
import useLockBodyScroll from '@/config/utils/hooks/useLockBodyScroll';
import { useProductInfoKeys } from '@/store/orderStore/order-info';
import { UserInfoAtom } from '@/store/userStore/state';
import React from 'react';
import DrawerInputForm from '../common/DrawerInputForm';

type Input = {
  keyname: string;
  label: string;
  value: string;
  placeholder: string;
  type?: 'mobile' | 'text';
}[];

const InputClickableBox = () => {
  const [open, setOpen] = useState(false);
  const userInfo = useRecoilValue(UserInfoAtom);
  const { username } = useProductInfoKeys(['username']);

  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const onClose = () => setOpen(false);

  useEffect(() => {
    setInputValues({
      phoneNumber: userInfo?.phoneNumber || '',
      username: username || '',
    });
  }, [userInfo]);

  const data: Input = [
    {
      keyname: 'phoneNumber',
      label: '연락처',
      value: '',
      placeholder: '연락처를 입력해주세요',
      type: 'mobile',
    },
    {
      keyname: 'username',
      label: '주문자',
      value: '',
      placeholder: '주문자를 입력해주세요',
      type: 'text',
    },
  ];

  const isInputEmpty = (value: string) =>
    value ? 'text-gray-900' : 'text-gray-400';

  useLockBodyScroll(open);

  return (
    <>
      <div
        className="flex flex-row border border-gray-300 rounded-lg p-4 relative hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col gap-2 w-full pr-4">
          {data.map((item) => (
            <div
              key={item.keyname}
              className="flex justify-between items-center"
            >
              <p className="text-sm text-gray-700">{item.label}</p>
              <p
                className={`text-sm font-normal max-w-[150px] truncate ${isInputEmpty(
                  inputValues[item.keyname],
                )}`}
              >
                {inputValues[item.keyname] || item.placeholder}
              </p>
            </div>
          ))}
        </div>

        <ChevronRight
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <DrawerForm
        open={open}
        onClose={() => {
          onClose();
        }}
        onOpen={() => setOpen(false)}
        minHeight="40vh"
        maxHeight="60vh"
      >
        <DrawerInputForm
          open={open}
          data={data}
          inputValues={inputValues}
          setInputValues={setInputValues}
          onClose={onClose}
          title="주문자 정보"
        />
      </DrawerForm>
    </>
  );
};

export default React.memo(InputClickableBox);
