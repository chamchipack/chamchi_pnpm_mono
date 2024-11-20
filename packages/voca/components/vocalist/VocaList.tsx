'use client';

import { Box, Chip, Divider, Typography } from '@mui/material';
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

interface Props {
  rows: Word<WordBase>[];
  language: Language;
  total: number;
  type: string;
}

export default function VocaList({ ...props }: Props) {
  const { data: session } = useSession();
  const [rows, setRows] = useState<Word<WordBase>[]>(props?.rows || []);
  const [total, setTotal] = useState(props?.total);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [likedButtonClicked, setLikedButtonClicked] = useState(false);

  const onLoadData = async (page: number, clicked?: boolean) => {
    if (!props?.language) return;
    if (clicked === null || clicked === undefined) clicked = false;

    const typeParams = props?.type ? { 'type.like': props?.type } : {};
    let likeParams = {};

    if (clicked) {
      const idArray = await onLoadLikedList();
      likeParams = { 'id.or': idArray || [] };
    }

    const { data = [], ...rest } = await db.search(
      props?.language as Collection,
      {
        options: {
          'language.like': props?.language,
          ...typeParams,
          ...likeParams,
        },
        pagination: { page, perPage: 10 },
      },
    );
    setTotal(data?.totalItems);
    const result = Array.isArray(data) ? data : data?.items;

    setRows(result);
  };

  const handleChipClick = async () => {
    onLoadData(1, !likedButtonClicked);
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
      return data[0]?.wordIds || [];
    } catch (e) {
      return [];
    }
  };

  return (
    <>
      <SearchInput language={props?.language} routingStatus={true} />

      <Divider sx={{ my: 3 }} />

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

        <Chip
          sx={{ mx: 2 }}
          label={likedButtonClicked ? '좋아요 해제' : '좋아요만 보기'}
          clickable
          onClick={handleChipClick}
          color={likedButtonClicked ? 'error' : 'default'}
        />
      </Box>

      <Box>
        {rows.length ? (
          <>
            {rows.map((item) => (
              <Box
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
                    <Typography variant="subtitle2" color="text.primary">
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
              onClickSearch={onLoadData}
            />

            {/* <Divider sx={{ my: 3 }} /> */}
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 50,
              background: '#e2e2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: 2,
              borderRadius: 3,
            }}
          >
            <Typography color="text.secondary">
              조회된 데이터가 없어요!
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
