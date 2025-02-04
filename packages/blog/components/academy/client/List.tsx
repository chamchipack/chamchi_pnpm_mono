'use client';
import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Title from './Title';
import ListImage from './ListImage';
import { getArticleListOrType } from '@/config/apollo-client/query';
import { useQuery } from '@apollo/client';

import useScrollBottom from './useScrollBottom';
import { motion } from 'framer-motion';
import { SearchCategoryAtom, SearchTextAtom } from './state';
import client from '@/config/apollo-client/apollo';

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
  const [pagination, setPagination] = useState({ page: 1, perPage: 5 });
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedData, setCachedData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const textState = useRecoilValue(SearchTextAtom);
  const categoryState = useRecoilValue(SearchCategoryAtom);

  const isBottom = useScrollBottom();

  const query = getArticleListOrType([
    '_id',
    'markdown_title',
    'markdown_contents',
    'created',
    'category',
    'userId',
    'userName',
    'summary',
    'thumbnail',
  ]);

  // useEffect(() => {
  //   const observable = client.watchQuery({
  //     query,
  //     variables: {
  //       input: {
  //         category: categoryState,
  //         markdown_title: textState,
  //         theme: props?.path,
  //         isPublic: true,
  //       },
  //       offset: offsetCalculate(currentPage, 5),
  //       limit: 5,
  //     },
  //     fetchPolicy: 'cache-only', // ✅ 서버 요청 없이 캐시 데이터만 감시
  //   });

  //   const subscription = observable.subscribe(({ data }) => {
  //     console.log('업데이트된 캐시:', client.cache.extract());
  //   });

  //   return () => subscription.unsubscribe();
  // }, [client]);

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
    fetchPolicy: 'cache-first', // ✅ 캐시에 데이터가 있으면 서버 요청 X
    // nextFetchPolicy: 'cache-first', // ✅ 캐시 유지 (Apollo 3.7 이상 지원)
    notifyOnNetworkStatusChange: false,
  });

  useEffect(() => {
    setHasMore(true);
  }, [categoryState]);

  // 초기 데이터 세팅
  useEffect(() => {
    if (data?.getArticleListOrType) {
      setCachedData(data.getArticleListOrType);
    }
  }, [data]);

  const handleLoadMore = async () => {
    // console.log(cachedData.length, 5, cachedData.length % pagination.perPage);
    if (
      !hasMore ||
      isFetchingMore ||
      cachedData.length % pagination.perPage !== 0
    )
      return;

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
          offset: cachedData.length,
          // offset: offsetCalculate(newPage - 1, pagination.perPage),
          limit: pagination.perPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || !fetchMoreResult.getArticleListOrType)
            return prev;

          return fetchMoreResult; // ✅ fetchMoreResult만 반환하면 `merge()`가 알아서 캐시 처리
        },
      });

      if (!newData?.getArticleListOrType.length) setHasMore(false);

      setCurrentPage(newPage);
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
                      {index}
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
