'use client'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function ProfileContainer () {
    const [open, setOpen] = useState(false);
    return <>
    <Box sx={{ display:'flex', alignItems: 'center', justifyContent:'center', mt: 3}}>
    <Box
          component="img"
          src="/user.png"
          alt="User Profile"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
    </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems:'center',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          padding: 2,
          position: 'relative',
          '&:hover': { cursor: 'pointer' },
          height: 50,
          my: 3
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
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography fontSize={14} color="text.primary">
                  닉네미
                </Typography>

                  <Typography
                    fontSize={14}
                    fontWeight="bold"
                    noWrap // ✅ 한 줄에서 벗어나면 자동으로 ... 처리
                    sx={{
                      maxWidth: 150, // ✅ 최대 너비 지정
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    닉넴
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

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', my: 3}}>
        <Typography fontSize={14} fontWeight='bold'>연동된 소셜 계정</Typography>
        <Typography fontSize={14} sx={{ color: 'common.gray'}}>카카오</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-around', my: 10}}>
        <Typography fontSize={14} sx={{ color: 'common.gray'}}>회원 탈퇴</Typography>
        <Typography fontSize={14} sx={{ color: 'common.gray'}}>로그아웃</Typography>
      </Box>
    </>
}