'use client';
import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoIcon from '@mui/icons-material/Info';
import SellerItemPictures from './SellerItemPictures';
import SellerInfo from './SellerInfo';

interface Props {
  sellerData: SellerSchema;
}

export default function SellerTabs({ sellerData }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  // ✅ 동적으로 탭과 컴포넌트 매칭
  const tabItems = [
    {
      label: '상품',
      icon: <StorefrontIcon />,
      component: <SellerItemPictures key="item-pictures" />,
    },
    {
      label: '가게 정보',
      icon: <InfoIcon />,
      component: <SellerInfo key="seller-info" sellerData={sellerData} />,
    },
  ];

  const tabCount = tabItems.length;
  const tabWidth = `${100 / tabCount}%`; // 탭 개수만큼 width 자동 조정

  return (
    <Box sx={{ mt: 2 }}>
      {/* ✅ 탭 UI */}
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        centered
        sx={{
          height: 60,
          borderBottom: 1,
          borderColor: 'grey.200',
          '& .MuiTabs-indicator': {
            backgroundColor: 'common.main',
            height: 2,
          },
        }}
      >
        {tabItems.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            iconPosition="start" // ✅ 아이콘을 왼쪽에 배치
            label={
              <Typography variant="body2" color="text.secondary">
                {tab.label}
              </Typography>
            }
            sx={{
              width: tabWidth,
              flexDirection: 'row', // ✅ 아이콘과 라벨을 수평 정렬
              gap: 1, // ✅ 아이콘과 라벨 간 간격 조정
              color: tabIndex === index ? 'black' : 'gray',
              '&.Mui-selected': {
                color: 'common.main',
              },
            }}
          />
        ))}
      </Tabs>

      {/* ✅ 선택된 탭의 컴포넌트 렌더링 (동적) */}
      <Box sx={{ mt: 2 }}>{tabItems[tabIndex].component}</Box>
    </Box>
  );
}
