'use client';

import { Box, Chip, Divider, Skeleton, Typography } from '@mui/material';
import SearchInput from '../language/SearchInput';
import CommonTitle from '../word/CommonTitle';
import { motion } from 'framer-motion';
import PaginationComponent from 'package/src/Pagination/Pagination';
import { useEffect, useState } from 'react';
import db from '@/api/module';
import { useSession } from 'next-auth/react';
import {
  Collection,
  Language,
  Word,
  typeGbn,
  WordBase,
} from '@/config/defaultType';
import { useRecoilState } from 'recoil';
import { PaginationAtom, ParametersAtom } from './state';
import { useData } from './hook';
import NoneDataOverlay from 'package/src/Overlay/None-DataOverlay';
import FetchErrorOverlay from 'package/src/Overlay/FetchErrorOverlay';
import { pretendardFont } from 'package/styles/fonts/module';

interface Props {
  rows: Word<WordBase>[];
  language: Language;
  total: number;
  type: string;
}

export default function VocaList({ ...props }: Props) {
  const { data: session } = useSession();
  const [pgnum, setPgnum] = useRecoilState(PaginationAtom);
  const [pagination, setPagination] = useState({
    page: pgnum || 1,
    perPage: 10,
  });
  const [likedButtonClicked, setLikedButtonClicked] = useState(false);
  const [, setParameters] = useRecoilState(ParametersAtom);

  const {
    isLoading,
    isError,
    data = { rows: [], total: 0 },
  } = useData(
    props?.language as Collection,
    pagination,
    props?.language,
    props?.type,
  );
  const rows: Word<WordBase>[] = (data?.rows as Word<WordBase>[]) || [];
  const total = data?.total;

  const handleChipClick = async () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    if (!likedButtonClicked) onLoadLikedList();
    else
      setParameters((prev) => {
        const updatedParams = { ...prev }; // 기존 객체 복사
        delete updatedParams['id.or']; // id.or 키 삭제
        return updatedParams; // 삭제된 객체 반환
      });

    setLikedButtonClicked(!likedButtonClicked);
  };

  const onLoadLikedList = async () => {
    try {
      const { data = [] } = await db.search('word_like', {
        options: {
          userId: session?.user?.id,
          'language.like': props?.language,
        },
      });

      setParameters((prev) => ({
        ...prev,
        'id.or': data[0]?.wordIds || [],
      }));
      // return data[0]?.wordIds || [];
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    setPgnum(pagination.page);
  }, [pagination.page]);

  const HeadComponent = () => {
    return (
      <Box
        sx={{
          px: 2,
          mb: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" color="text.primary">
          단어 리스트
        </Typography>

        {session && (
          <Chip
            sx={{ mx: 2 }}
            label={likedButtonClicked ? '좋아요 해제' : '좋아요만 보기'}
            clickable
            onClick={handleChipClick}
            color={likedButtonClicked ? 'error' : 'default'}
          />
        )}
      </Box>
    );
  };

  if (isLoading || !rows)
    return (
      <div style={{ height: '100%' }}>
        <HeadComponent />
        <Skeleton width="100%" height={60} sx={{ mb: 2 }} />
      </div>
    );

  if (isError) return <FetchErrorOverlay />;

  return (
    <>
      <HeadComponent />
      <Box>
        {rows.length ? (
          <>
            {rows.map((item) => (
              <Box
                key={item?.id}
                component={motion.div}
                whileHover={{ y: -2 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60,
                  p: 2,
                  mb: 2,
                }}
              >
                <Box sx={{ minWidth: 150 }}>
                  <CommonTitle
                    title={item?.jp}
                    color="text.primary"
                    variant="h3"
                    language={props?.language}
                    id={item?.id}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="info.main"
                      sx={{ mr: 1 }}
                    >
                      {item?.kana}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {typeGbn[item?.type]}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.primary"
                      sx={{ ...pretendardFont }}
                    >
                      {item?.ko}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}

            <PaginationComponent
              total={total}
              pagination={pagination}
              setPagination={setPagination}
            />
          </>
        ) : (
          <NoneDataOverlay />
        )}
      </Box>
    </>
  );
}
