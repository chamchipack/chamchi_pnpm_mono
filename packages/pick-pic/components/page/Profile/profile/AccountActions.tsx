'use client';

import { deleteAccount } from '@/api/client/user';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { UserInfoAtom } from '@/store/userStore/state';
import { ResponseStatus } from '@/types/enums/enums';
import { LogOutIcon, UserXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

const quit_content = `회원 탈퇴 시 사용 중인 모든 정보는 삭제되며, 복구가 불가능합니다.

단, 관련 법령에 따라 일정 기간 보관이 필요한 정보는 약관의 보존 기간 동안 안전하게 저장되며, 해당 기간이 경과한 후에는 완전히 삭제됩니다.

이용 내역, 저장된 설정, 혜택 등도 모두 사라지며 다시 가입하셔도 이전 정보는 복원되지 않습니다.

그래도 탈퇴를 진행하시겠습니까?
`;

const AccountActions = () => {
  const router = useRouter();
  const alert = useAlert();

  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const onClickLogout = async () => {
    setLoading(true);
    sessionStorage.setItem('session_to_expire', 'granted');
    router.push('/user/session-expired');
  };

  const onClickQuitAccount = async () => {
    setLoading(true);
    const { message, status } = await deleteAccount(userInfo._id);
    if (status === ResponseStatus.success) {
      sessionStorage.setItem('session_to_expire', 'granted');
      router.push('/user/session-expired');
    } else {
      alert({
        message: message || '오류가 발생했습니다',
        type: status,
      });
    }
  };

  return (
    <>
      <div className="h-full my-6">
        {/* 섹션 타이틀 */}

        <div className="pt-2 flex justify-center gap-4 text-xs h-full">
          <button
            onClick={() => setQuitOpen(true)}
            className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700"
          >
            <UserXIcon className="w-4 h-4" />
            회원탈퇴
          </button>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700"
          >
            <LogOutIcon className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </div>

      <ActionConfirmationModal
        open={open}
        handleClose={handleClose}
        onClickCheck={onClickLogout}
        title="로그아웃"
        content="확인을 누르면 로그아웃을 진행합니다."
        processing={loading}
      />

      <ActionConfirmationModal
        open={quitOpen}
        handleClose={() => setQuitOpen(false)}
        onClickCheck={onClickQuitAccount}
        title="회원탈퇴"
        content={quit_content}
        processing={loading}
      />
    </>
  );
};

export default React.memo(AccountActions);
