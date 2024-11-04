import React, { useEffect, useState } from 'react';
import db from '@/api/module';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommonTitle from '@/components/word/CommonTitle';
import PaginationComponent from 'package/src/Pagination/Pagination';
import { kboFont } from 'package/styles/fonts/module';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VerbFormTransformer from '@/components/word/verb/VerbFormTransformer';

interface Props {
  data: any;
  onClickReset: () => void;
}

const SelectedVocabulary = ({ data, onClickReset }: Props) => {
  const path = usePathname();
  const [, , language] = path.split('/');

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [hiddenStates, setHiddenStates] = useState<{
    [key: string]: {
      titleHidden: boolean;
      kanaHidden: boolean;
      koHidden: boolean;
    };
  }>({});
  const [allTitlesHidden, setAllTitlesHidden] = useState(false);
  const [allKanaHidden, setAllKanaHidden] = useState(false);
  const [allKoHidden, setAllKoHidden] = useState(false);

  const onLoadData = async (page: number) => {
    setLoading(true);

    const { data: result = [] } = await db.search('japanese', {
      options: { 'id.or': data?.wordId, 'language.like': language },
      pagination: { page, perPage: 10 },
    });

    const _result = Array.isArray(result) ? result : result?.items;
    setRows(_result);
    setTotal(result?.totalItems);
    setLoading(false);
  };

  useEffect(() => {
    onLoadData(1);
  }, []);

  const toggleVisibility = (
    id: string,
    field: 'titleHidden' | 'kanaHidden' | 'koHidden',
  ) => {
    setHiddenStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const handleTitleChipClick = () => {
    setAllTitlesHidden((prev) => !prev);
    setHiddenStates((prev) => {
      const newState = { ...prev };
      rows.forEach((item) => {
        newState[item.id] = {
          ...newState[item.id],
          titleHidden: !allTitlesHidden,
        };
      });
      return newState;
    });
  };

  const handleKanaChipClick = () => {
    setAllKanaHidden((prev) => !prev);
    setHiddenStates((prev) => {
      const newState = { ...prev };
      rows.forEach((item) => {
        newState[item.id] = {
          ...newState[item.id],
          kanaHidden: !allKanaHidden,
        };
      });
      return newState;
    });
  };

  const handleKoChipClick = () => {
    setAllKoHidden((prev) => !prev);
    setHiddenStates((prev) => {
      const newState = { ...prev };
      rows.forEach((item) => {
        newState[item.id] = {
          ...newState[item.id],
          koHidden: !allKoHidden,
        };
      });
      return newState;
    });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <IconButton
          aria-label="search"
          onClick={onClickReset}
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
          }
          sx={{ alignSelf: 'center' }}
        >
          <ArrowBackIosNewIcon sx={{ color: 'text.primary' }} />
        </IconButton>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ ...kboFont, ml: 1, alignSelf: 'center' }}
        >
          {data?.name}
        </Typography>
      </Box>

      <Box sx={{ my: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label={allTitlesHidden ? '단어 보이기' : '단어 가리기'}
          clickable
          onClick={handleTitleChipClick}
          color={'default'}
        />
        <Chip
          label={allKanaHidden ? '발음 보이기' : '발음 가리기'}
          clickable
          onClick={handleKanaChipClick}
          color={'default'}
        />
        <Chip
          label={allKoHidden ? '뜻 보이기' : '뜻 가리기'}
          clickable
          onClick={handleKoChipClick}
          color={'default'}
        />
      </Box>

      {rows.map((item) => (
        <Accordion
          key={item.id}
          sx={{
            boxShadow: 'none',
            borderRadius: 2,
            mb: 1,
            border: 'none',
            '&:before': {
              display: 'none', // 아코디언 상단의 기본 보더 제거
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${item.id}-content`}
            id={`panel-${item.id}-header`}
            sx={{
              borderBottom: 'none', // 하단 보더 제거
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ minWidth: 100 }}>
                <Typography
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 방지
                    toggleVisibility(item.id, 'titleHidden');
                  }}
                  variant="h3"
                  color="text.primary"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'info.main' } }}
                >
                  {hiddenStates[item.id]?.titleHidden ? '****' : item?.jp}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography
                    variant="caption"
                    color={
                      hiddenStates[item.id]?.kanaHidden
                        ? 'text.disabled'
                        : 'info.main'
                    }
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 방지
                      toggleVisibility(item.id, 'kanaHidden');
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    {hiddenStates[item.id]?.kanaHidden ? '****' : item?.kana}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    color={
                      hiddenStates[item.id]?.koHidden
                        ? 'text.disabled'
                        : 'text.primary'
                    }
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 방지
                      toggleVisibility(item.id, 'koHidden');
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    {hiddenStates[item.id]?.koHidden ? '****' : item?.ko}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: 'none', // 상단 보더 제거
            }}
          >
            {/* 감춰진 부분에 다른 콘텐츠 추가 */}
            {item?.type === 'verb' ? <VerbFormTransformer data={item} /> : null}
          </AccordionDetails>
        </Accordion>
      ))}

      <PaginationComponent
        total={total}
        pagination={pagination}
        setPagination={setPagination}
        onClickSearch={onLoadData}
      />
    </>
  );
};

export default SelectedVocabulary;
