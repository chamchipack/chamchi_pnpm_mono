'use client';

import { Box, Divider, Typography } from '@mui/material';
import SearchInput from '../language/SearchInput';
import CommonTitle from '../word/CommonTitle';
import { motion } from 'framer-motion';
import { Noun, typeGbn, Verb, Word } from '@/config/default';
import PaginationComponent from 'package/src/Pagination/Pagination';
import { useEffect, useState } from 'react';
import db from '@/api/module';

interface Props {
  rows: Word<Verb | Noun>[];
  language: 'japanese';
  total: number;
  type: string;
}
export default function VocaList({ ...props }: Props) {
  const [rows, setRows] = useState(props?.rows || []);
  const [total, setTotal] = useState(props?.total);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const onLoadData = async (page: number) => {
    if (!props?.language) return;

    const typeParams = props?.type ? { 'type.like': props?.type } : {};

    const { data = [], ...rest } = await db.search(props?.language, {
      options: { 'language.like': props?.language, ...typeParams },
      pagination: { page, perPage: 10 },
    });
    setTotal(data?.totalItems);
    const result = Array.isArray(data) ? data : data?.items;

    setRows(result);
  };

  return (
    <>
      <SearchInput language={props?.language} />

      <Divider sx={{ my: 3 }} />

      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          리스트
        </Typography>
      </Box>

      <Box>
        {rows.length ? (
          <>
            {rows.map((item: any) => (
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
