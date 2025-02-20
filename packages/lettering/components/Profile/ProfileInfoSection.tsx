'use client';
import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InputTextField from '../Order/order/common/InputTextField';
import DrawerForm from '@/components/common/modal/DrawerForm';
import { handleStorage } from '@/config/navigation';

import { useRecoilState, useRecoilValue } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';

export default function ProfileInfoSection() {
  const [open, setOpen] = useState(false);

  const [nickname, setNickname] = useState(''); // ✅ 닉네임 상태
  const [recoilNickname, setRecoilNickName] = useRecoilState(UserInfoAtom);

  const [clientNickname, setClientNickname] = useState<string | null>(null);

  useEffect(() => {
    setClientNickname(recoilNickname.nickname); // ✅ 클라이언트에서 Recoil 값 업데이트
  }, [recoilNickname.nickname]);

  const handleClose = () => setOpen(false);

  const handleStorageData = (name: string) => {
    const data = {
      key: 'nickname',
      name,
    };
    const isWebView = handleStorage({ data });

    setRecoilNickName((prev) => ({ ...prev, nickname: name }));

    if (!isWebView) localStorage.setItem('nickName', name);
    setOpen(false);
  };

  const cachedNickname = useMemo(
    () => clientNickname ?? '로딩 중...',
    [clientNickname],
  );

  return (
    <>
      {/* 닉네임 박스 (클릭 시 모달 오픈) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          padding: 2,
          position: 'relative',
          '&:hover': { cursor: 'pointer' },
          height: 50,
          my: 3,
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '95%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography fontSize={14} color="text.primary">
                유저 이름
              </Typography>
              <Typography
                fontSize={14}
                fontWeight="bold"
                noWrap
                sx={{
                  maxWidth: 150,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {cachedNickname} {/* ✅ 변경된 닉네임 반영 */}
              </Typography>
            </Box>
          </Box>
          <ArrowForwardIosIcon
            sx={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 14,
              color: 'gray',
            }}
          />
        </Box>
      </Box>

      {/* 연동된 소셜 계정 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          my: 3,
        }}
      >
        <Typography fontSize={14} fontWeight="bold">
          연동된 소셜 계정
        </Typography>
        <Typography fontSize={14} sx={{ color: 'common.gray' }}>
          카카오
        </Typography>
      </Box>

      {/* 닉네임 수정 모달 */}
      <DrawerForm
        open={open}
        onClose={handleClose}
        minHeight="40vh"
        maxHeight="60vh"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            p: 3,
          }}
        >
          <Box>
            <Typography fontSize={14} fontWeight="bold" sx={{ mb: 1 }}>
              닉네임 수정
            </Typography>

            <InputTextField value={nickname} setValue={setNickname} />
          </Box>
          <Button
            fullWidth
            onClick={() => handleStorageData(nickname)}
            sx={{
              height: 45,
              fontSize: 14,
              backgroundColor: 'common.main',
              color: 'white',
              '&: hover': { backgroundColor: 'common.main', color: 'white' },
            }}
          >
            저장
          </Button>
        </Box>
      </DrawerForm>
    </>
  );
}
