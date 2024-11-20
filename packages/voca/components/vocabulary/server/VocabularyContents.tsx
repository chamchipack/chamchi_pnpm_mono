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
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoneDataOverlay from 'package/src/Overlay/None-DataOverlay';

interface Props {
  perPage: number;
  clickable: boolean;
}

const VocabularyContents = ({ ...props }: Props) => {
  const path = usePathname();
  const { data: session } = useSession();

  const [, , language] = path.split('/');

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
    setSelectedRow(item);
    setIsClicked(true);
  };

  const onClickReset = () => {
    setSelectedRow(null);
    setIsClicked(false);
  };

  useEffect(() => {
    onLoadVocaList(1);
  }, []);

  if (loading) return <Skeleton sx={{ width: '100%', height: 40 }} />;

  return (
    <div style={{ padding: 6 }}>
      {!isClicked && props?.clickable && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <RouterBack />
            <Typography variant="subtitle1" color="text.primary" sx={{ my: 1 }}>
              내 단어장 목록
            </Typography>
          </Box>

          <IconButton
            onClick={async () => {
              const form = {
                name: '새로운 단어장',
                userId: session?.user?.id,
                wordId: [],
                language,
              };
              await db.create('vocabulary', form);
              onLoadVocaList(1);
            }}
          >
            <CreateNewFolderIcon />
          </IconButton>
        </Box>
      )}
      {isClicked && selectedRow ? (
        <SelectedVocabulary
          data={selectedRow}
          onClickReset={onClickReset}
          onLoadVocaList={onLoadVocaList}
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
                  height: 70,
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
        <NoneDataOverlay mt={3} />
      )}
    </div>
  );
};

export default VocabularyContents;
