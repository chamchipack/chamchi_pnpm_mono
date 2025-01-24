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
  markdownText: string;
}

export default function DeleteButton({
  id,
  path,
  userId,
  isEditon,
  markdownText,
}: Props) {
  const { data } = useSession();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setIsEditPageon] = useRecoilState(isEditPageon);
  const [, setFilterState] = useRecoilState(SearchFilterAtom);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const extractFileIdFromMarkdown = (markdownText: string) => {
    const regex = /https?:\/\/[^/]+\/api\/files\/[^/]+\/([^/]+)\//g;
    const matches = [];
    let match;

    // 정규식을 사용해 고유 ID 부분을 추출
    while ((match = regex.exec(markdownText)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  };

  const onClickDelete = async () => {
    const fileIds = extractFileIdFromMarkdown(markdownText);

    setLoading(true);

    try {
      if (fileIds.length) {
        for (let filed of fileIds) {
          await db.delete('images', filed);
          await delay(200);
        }
      }

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
              // setFilterState({ 'category.like': '' });
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
