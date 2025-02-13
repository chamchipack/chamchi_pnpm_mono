'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DrawerForm from '@/components/common/modal/DrawerForm';
import { useState } from 'react';
import DrawerInputForm from './DrawerInputForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  data: { label: string; value: string }[];
  onClick?: () => void;
  isLabelVisable: boolean;
  type: 'text' | 'coupon';
}

export default function InputClickableBox({
  data = [],
  onClick,
  isLabelVisable = false,
  type = 'text',
}: Props) {
  const [open, setOpen] = useState(false);

  // ✅ inputValues를 객체로 저장 (label을 key로 사용)
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    data.reduce((acc, item) => ({ ...acc, [item.label]: item.value }), {}),
  );

  const onClose = () => setOpen(false);

  return (
    <>
      {/* 클릭 가능한 Box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          padding: 2,
          position: 'relative',
          '&:hover': { cursor: 'pointer' },
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
            {data.map((item, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography fontSize={14} color="text.primary">
                  {item.label}
                </Typography>

                {isLabelVisable ? (
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
                    {inputValues[item.label] || item.value}
                  </Typography>
                ) : (
                  <>
                    {inputValues[item.label] ? (
                      <CheckCircleIcon sx={{ color: 'info.main' }} />
                    ) : (
                      ''
                    )}
                  </>
                )}
              </Box>
            ))}
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

      {/* ✅ Drawer 내부에 `DrawerInputForm` 적용 */}
      <DrawerForm
        open={open}
        onClose={onClose}
        minHeight="40vh"
        maxHeight="60vh"
      >
        {type === 'text' && (
          <DrawerInputForm
            data={data}
            inputValues={inputValues}
            setInputValues={setInputValues}
            onClose={onClose}
          />
        )}
      </DrawerForm>
    </>
  );
}
