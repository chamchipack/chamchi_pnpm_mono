'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import db from '@/api/module';
import { usePathname } from 'next/navigation';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import PaginationComponent from 'package/src/Pagination/Pagination';
import SelectedVocabulary from '../client/SelectedVocabulary';
import { Vocabulary } from '@/config/defaultType';
import { useRouter } from 'next/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RouterBack from '@/components/RouterIcon/RouterBack';

interface Props {
  perPage: number;
  clickable: boolean;
}

const VocabularyContents = ({ ...props }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<string | 'create' | 'update'>('');
  const [rows, setRows] = useState<Vocabulary[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: props?.perPage || 10,
  });
  const [isClicked, setIsClicked] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // 선택된 로우 저장

  const onLoadVocaList = async (page: number) => {
    setLoading(true);
    const [, , language] = path.split('/');
    const { data = [] } = await db.search('vocabulary', {
      options: { userId: session?.user?.id, 'language.like': language },
      pagination: { page, perPage: 5 },
    });

    const result = Array.isArray(data) ? data : data?.items;
    setRows(result);
    setTotal(data?.totalItems);
    setLoading(false);
  };

  const onClickRow = (item: any) => {
    setSelectedRow(item); // 선택된 로우를 상태에 저장
    setIsClicked(true);
  };

  const onClickReset = () => {
    setSelectedRow(null); // 선택된 로우를 상태에 저장
    setIsClicked(false);
  };

  useEffect(() => {
    onLoadVocaList(1);
  }, []);

  if (loading) return <Skeleton sx={{ width: '100%', height: 40 }} />;

  return (
    <div style={{ padding: 6 }}>
      {!isClicked && props?.clickable && (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <RouterBack />
          <Typography variant="subtitle1" color="text.primary" sx={{ my: 1 }}>
            내 단어장 목록
          </Typography>

          <Button
            onClick={() => {
              // setMode('create');
              const rs = {
                id: '',
                name: '새로운 단어장',
                userId: session?.user?.id,
                wordId: [] as string[],
              };
              setRows([rs, ...rows]);
            }}
          >
            새 단어장 만들기
          </Button>
        </Box>
      )}
      {isClicked && selectedRow ? (
        <SelectedVocabulary
          data={selectedRow}
          onClickReset={onClickReset}
          mode={mode}
        />
      ) : rows.length ? (
        <>
          {rows.map((item: any) => (
            <div key={item.id}>
              <Box
                component={motion.div}
                onClick={() => {
                  if (!props?.clickable) return;
                  setMode('update');
                  onClickRow(item);
                }}
                whileHover={{ y: props?.clickable ? -2 : 0 }}
                sx={{
                  cursor: props?.clickable ? 'pointer' : 'normal',
                  height: 50,
                  p: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography color="text.primary">{item?.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  등록된 단어수{' '}
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="error.main"
                  >
                    {item?.wordId.length}
                  </Typography>{' '}
                  개
                </Typography>
              </Box>
              <Divider />
            </div>
          ))}
          <PaginationComponent
            total={total}
            pagination={pagination}
            setPagination={setPagination}
            onClickSearch={onLoadVocaList}
          />
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
            mt: 4,
            borderRadius: 3,
          }}
        >
          <Typography color="text.secondary">
            조회된 데이터가 없어요!
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default VocabularyContents;
