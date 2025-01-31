'use client';
// import db from '@/api/module';
import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { PaginationAtom, SearchFilterAtom } from './state';
import Title from './Title';
import ListImage from './ListImage';
// import PaginationComponent from './Pagination';
// import useIsRendering from 'package/src/hooks/useRenderStatus';
import { getArticleListOrType } from '@/config/apollo-client/query';
import { useQuery } from '@apollo/client';

import useScrollBottom from './useScrollBottom';
import { motion } from 'framer-motion';
import { SearchCategoryAtom, SearchTextAtom } from './state';

interface Props {
  rows: any[];
  path: string;
  total: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const offsetCalculate = (cur: number, per: number) => cur * per;

const List = ({ ...props }: Props) => {
  // const renderStatus = useIsRendering();
  // const [rows, setRows] = useState<any>([]);
  // const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, perPage: 5 });
  // const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false); // 중복 호출 방지
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [cachedData, setCachedData] = useState<any[]>([]); // 누적된 데이터 저장

  const textState = useRecoilValue(SearchTextAtom);
  const categoryState = useRecoilValue(SearchCategoryAtom);
  // const [paginationState, setPaginationState] = useRecoilState(PaginationAtom);

  const isBottom = useScrollBottom();

  const query = getArticleListOrType([]);

  const { data, fetchMore, loading } = useQuery(query, {
    variables: {
      input: {
        category: categoryState,
        markdown_title: textState,
        theme: props?.path,
        isPublic: true,
      },
      offset: offsetCalculate(0, 5),
      limit: 5,
    },
    fetchPolicy: 'cache-and-network',
  });

  // 초기 데이터 세팅
  useEffect(() => {
    if (data?.getArticleListOrType) {
      // setRows(data.getArticleListOrType);
      setCachedData(data.getArticleListOrType);
    }
  }, [data]);

  // 스크롤이 바닥에 도달하면 fetchMore 실행
  const handleLoadMore = async () => {
    if (isFetchingMore || cachedData.length % pagination.perPage !== 0) return; // 중복 호출 방지

    setIsFetchingMore(true);

    try {
      const newPage = currentPage + 1;

      const { data: newData } = await fetchMore({
        variables: {
          input: {
            category: categoryState,
            markdown_title: textState,
            theme: props?.path,
            isPublic: true,
          },
          offset: offsetCalculate(newPage - 1, pagination.perPage),
          limit: pagination.perPage,
        },
      });

      if (newData?.getArticleListOrType?.length) {
        setCachedData((prevData) => [
          ...prevData,
          ...newData.getArticleListOrType,
        ]); // 기존 데이터에 추가
        // setRows((prevData) => [...prevData, ...newData.getArticleListOrType]); // UI 업데이트
        setCurrentPage(newPage); // 페이지 업데이트
      }
    } finally {
      setIsFetchingMore(false);
    }
  };

  // 스크롤이 바닥에 닿으면 handleLoadMore 실행
  useEffect(() => {
    if (isBottom) {
      handleLoadMore();
    }
  }, [isBottom]);

  useEffect(() => {
    setCurrentPage(1);
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [categoryState]);

  useEffect(() => {
    // console.log(cachedData);
  }, [cachedData]);

  return (
    <>
      {cachedData.length ? (
        <>
          {cachedData.map((item: any, index: number) => (
            <Box
              component={motion.div}
              key={item._id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              sx={{ width: '100%', minHeight: 140, mt: 4 }}
            >
              <Box
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'flex-start',
                  height: '140px',
                }}
              >
                <Box
                  sx={{
                    width: '70%', //"70%"
                    pr: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Title item={item} path={props?.path} />

                  <Box sx={{ mt: 1, flexGrow: 1, width: '100%' }}>
                    <Typography
                      fontSize={12}
                      color="text.secondary"
                      lineHeight={1.3}
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {item.summary}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontSize={12} color="text.secondary">
                      작성자: {item?.userName}
                    </Typography>
                  </Box>

                  {/* <Box>
                    <Typography fontSize={12} color="text.secondary">
                      날짜: {item.timestamp}
                    </Typography>
                  </Box> */}
                </Box>

                <Box
                  sx={{
                    width: '30%',
                    maxWidth: 200,
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <ListImage
                    collectionId={item?.collectionId}
                    recordId={item?._id}
                    imageName={item?.thumbnail}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <>
          {loading ? (
            <Skeleton sx={{ width: '100%', height: 250 }} />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: 50,
                background: '#e2e2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 4,
                borderRadius: 3,
              }}
            >
              <Typography color="text.secondary">
                조회된 글이 없어요!
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default List;
