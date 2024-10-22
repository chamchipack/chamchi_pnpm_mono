import { Schema } from '@/config/schema';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import db from '@/api/module';
import SaveModal from 'package/src/Modal/SaveModal';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isEditPageon from '../academy/state';
import { SearchFilterAtom } from '../academy/client/state';

interface Props {
  id: string;
  path: string;
  userId: string;
  isEditon: boolean;
}

export default function DeleteButton({ id, path, userId, isEditon }: Props) {
  const { data } = useSession();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setIsEditPageon] = useRecoilState(isEditPageon);
  const [, setFilterState] = useRecoilState(SearchFilterAtom);

  const onClickDelete = async () => {
    setLoading(true);

    try {
      await db.delete('library', id);
      setIsEditPageon(false);
      router.push(`/pinetree/${path}`);

      setLoading(false);
      setFilterState({ 'category.like': '' });

      setModal(false);
    } catch {}
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {!isEditon ? (
          <IconButton
            onClick={() => {
              setIsEditPageon(false);
              router.push(`/pinetree/${path}`);
              setFilterState({ 'category.like': '' });
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        ) : null}

        {data?.user?.username !== userId || !data ? null : (
          <IconButton onClick={() => setModal(true)}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
      <SaveModal
        open={modal}
        handleClose={() => setModal(false)}
        title="작성된 글 삭제"
        content="작성된 글을 삭제 하시겠습니까?"
        isAlertModal={false}
        onClickCheck={onClickDelete}
        processing={loading}
      />
    </>
  );
}
