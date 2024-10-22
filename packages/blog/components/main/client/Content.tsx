'use client';
import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import ListImage from '@/components/academy/client/ListImage';
import { useRouter } from 'next/navigation';

interface ContentProps {
  data: {
    id: number;
    markdown_title: string;
    summary: string;
  };
}

export default function Content({ data }: ContentProps) {
  const router = useRouter();
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} key={data?.id}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 280,
          my: 2,
          mx: 2,
          background: 'white',
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            height: '65%',
            width: '100%',
          }}
        >
          <ListImage
            collectionId={data?.collectionId}
            recordId={data?.id}
            imageName={data?.thumbnail}
          />
        </Box>

        <CardContent
          sx={{
            height: '35%',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            fontSize={18}
            fontWeight={500}
            sx={{
              '&:hover': { color: 'info.dark' },
              cursor: 'pointer',
            }}
            onClick={() => {
              if (!data?.id) return;
              router.push(`/pinetree/${data?.theme}/${data?.id}`);
            }}
          >
            {data?.markdown_title}
          </Typography>

          {/* 요약 부분 */}
          <Typography
            fontSize={12}
            color="text.secondary"
            lineHeight={1.3}
            sx={{ wordBreak: 'break-word', mt: 1 }}
          >
            {data.summary}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography fontSize={12} color="text.secondary">
              작성자: {data?.userName}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              {data.timestamp}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
