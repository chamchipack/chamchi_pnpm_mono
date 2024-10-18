import { Schema } from '@/config/schema';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import db from '@/api/module';
import AlertModal from 'package/src/Modal/AlertModal';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import isEditPageon from '../academy/state';

interface Props {
  id: string;
  path: Schema;
  userId: string;
  isEditon: boolean;
}

export default function DeleteButton({ id, path, userId, isEditon }: Props) {
  const { data } = useSession();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEditPage = useRecoilValue(isEditPageon);

  const onClickDelete = async () => {
    setLoading(true);

    try {
      await db.delete(path, id);

      router.push(`/pinetree/${path}`);
      setLoading(false);
    } catch {}
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {!isEditon ? (
          <IconButton onClick={() => router.back()}>
            <ArrowBackIosNewIcon />
          </IconButton>
        ) : null}

        {data?.user?.username !== userId || !data ? null : (
          <IconButton onClick={() => setModal(true)}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
      <AlertModal
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
