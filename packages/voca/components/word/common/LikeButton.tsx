import { IconButton, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import db from '@/api/module';
import { useSession } from 'next-auth/react';

interface Props {
  wordId: string;
}

interface LikeStatus {
  id: string;
  status: boolean;
  wordIds: string[];
}

const LikeButton = ({ wordId }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [likeStatus, setLikeStatus] = useState<LikeStatus>({
    id: '',
    status: false,
    wordIds: [],
  });

  const onLoadLikeStatus = async () => {
    setLoading(true);

    try {
      const { data = [] } = await db.search('word_like', {
        options: {
          'userId.equal': session?.user?.id,
        },
      });

      const userLikeData = data.find(
        ({ userId = '' }) => userId === session?.user?.id,
      );
      if (userLikeData) {
        setLikeStatus({
          id: userLikeData.id,
          status: userLikeData.wordIds.includes(wordId),
          wordIds: userLikeData.wordIds,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onClickChangeStatus = async () => {
    const updatedWordIds = likeStatus.status
      ? likeStatus.wordIds.filter((id) => id !== wordId)
      : [...likeStatus.wordIds, wordId];

    const form = {
      id: likeStatus.id,
      userId: session?.user?.id,
      wordIds: updatedWordIds,
    };

    if (form.id) await db.update('word_like', form);
    else await db.create('word_like', form);

    setLikeStatus({
      id: form.id || likeStatus.id,
      status: !likeStatus.status,
      wordIds: updatedWordIds,
    });
  };

  useEffect(() => {
    if (session?.user?.id) onLoadLikeStatus();
  }, [session?.user?.id]);

  return (
    <>
      {loading ? (
        <Skeleton sx={{ width: 20, height: 20 }} />
      ) : (
        <IconButton onClick={onClickChangeStatus}>
          <FavoriteIcon sx={{ color: likeStatus.status ? 'error.main' : '' }} />
        </IconButton>
      )}
    </>
  );
};

export default LikeButton;
