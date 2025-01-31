import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import pb from '@/api/server/db/pocketbase';
import { Schema } from '@/config/schema';
import db from '@/api/module';

interface ImageBoxProps {
  collectionId: string;
  recordId: string;
  imageName: string;
  index: number;
}

export default function ImageBox({
  collectionId,
  recordId,
  imageName,
  index,
}: ImageBoxProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리

  const getImageUrl = async () => {
    try {
      if (imageName) {
        const { data = {} } = await db.single('library', recordId);
        // const record = await pb.collection('library').getOne(recordId);
        const fileUrl = pb.files.getUrl(data, imageName);
        return fileUrl;
      } else return '';
    } catch (error) {
      console.error('이미지를 가져오는 중 오류가 발생했습니다:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      setLoading(false);
      setImageUrl(null);

      const generatedUrl = await getImageUrl();

      if (generatedUrl) setImageUrl(generatedUrl);
      setLoading(false);
    };
    fetchImageUrl();
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#e2e2e2',
            borderRadius: 3,
          }}
        >
          <CircularProgress size={24} sx={{ color: 'white' }} />{' '}
          {/* 로딩 스피너 */}
        </Box>
      ) : imageUrl ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <img
            src={imageUrl}
            alt="저장된 이미지"
            // layout="fill"
            // objectFit="cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            background: '#e2e2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: 3,
            backgroundImage: `url(/${index % 2 === 0 ? `thumbnail` : 'wave'}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* <Typography fontSize={12} color="text.primary">
            저장된 썸네일이 <br />
            없습니다
          </Typography> */}
        </Box>
      )}
    </>
  );
}
