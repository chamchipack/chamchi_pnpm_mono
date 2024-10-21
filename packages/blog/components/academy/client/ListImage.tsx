import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import pb from '@/api/server/db/pocketbase';
import { Schema } from '@/config/schema';

interface ImageBoxProps {
  collectionId: string;
  recordId: string;
  imageName: string;
  path: Schema;
}

export default function ImageBox({
  collectionId,
  recordId,
  imageName,
  path,
}: ImageBoxProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리

  const getImageUrl = async () => {
    try {
      const record = await pb.collection(path).getOne(recordId);
      const fileUrl = pb.files.getUrl(record, imageName); // record와 imageName 사용
      return fileUrl;
    } catch (error) {
      console.error('이미지를 가져오는 중 오류가 발생했습니다:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      const generatedUrl = await getImageUrl();
      if (generatedUrl) {
        setImageUrl(generatedUrl);
      }
      setLoading(false); // 로딩 완료 시 상태 업데이트
    };

    fetchImageUrl(); // 비동기 함수 호출
  }, [collectionId, recordId, imageName, path]);

  return (
    <Box
      sx={{
        width: '30%',
        maxWidth: 200,
        height: '100%',
        position: 'relative',
      }}
    >
      {loading ? ( // 로딩 중일 때 표시
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
            position: 'relative', // 부모 박스에 상대적 위치 설정
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Image
            src={imageUrl}
            alt="저장된 이미지"
            layout="fill"
            objectFit="cover" // 박스에 맞춰서 이미지를 채움
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
          }}
        >
          <Typography fontSize={12} color="text.primary">
            저장된 이미지가 <br />
            없습니다
          </Typography>
        </Box>
      )}
    </Box>
  );
}
