'use client';
import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ✅ FAQ 더미 데이터 (제목, 내용, id)
const faqData = [
  {
    id: 1,
    title: 'MUI란 무엇인가요?',
    content: 'MUI(Material-UI)는 React UI 라이브러리입니다.',
  },
  {
    id: 2,
    title: '어떻게 설치하나요?',
    content:
      'npm install @mui/material @emotion/react @emotion/styled 명령어를 사용하세요.',
  },
  {
    id: 3,
    title: 'Accordion 컴포넌트는 어떻게 사용하나요?',
    content:
      'MUI의 Accordion 컴포넌트를 사용하면 아코디언 UI를 쉽게 만들 수 있습니다.',
  },
  {
    id: 4,
    title: 'MUI는 무료인가요?',
    content: '네, MUI는 오픈소스로 무료로 사용 가능합니다.',
  },
  {
    id: 5,
    title: 'MUI의 주요 기능은 무엇인가요?',
    content:
      '반응형 디자인, 커스텀 테마, 다양한 UI 컴포넌트 제공 등이 있습니다.',
  },
  {
    id: 6,
    title: 'MUI와 Tailwind CSS의 차이점은?',
    content:
      'MUI는 컴포넌트 기반이며, Tailwind는 유틸리티 기반 스타일링을 제공합니다.',
  },
];

export default function FAQContainer() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAccordionChange = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id)); // 이미 열려있으면 닫고, 아니면 열기
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      {faqData.map(({ id, title, content }) => (
        <Accordion
          key={id}
          expanded={expandedId === id}
          onChange={() => handleAccordionChange(id)}
          sx={{
            boxShadow: 'none',
            borderRadius: 2,
            mb: 1,
            border: 'none',
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              borderBottom: 'none',
            }}
          >
            <Typography fontWeight="bold">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
