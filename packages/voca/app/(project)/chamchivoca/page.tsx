'use client';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { kboFont } from 'package/styles/fonts/module';

const Page = () => {
  const router = useRouter();
  const languages = [
    {
      name: '일본어',
      value: 'japanese',
      color: '#EECEC1',
      image: '/hiragana.png', // 이미지가 있는 경우
    },
    {
      name: '영어',
      value: 'english',
      color: '#89A8AE',
      // image가 없는 경우
    },
  ];

  const handleNavigation = (language: string) => {
    router.push(`/chamchivoca/${language}`);
  };

  return (
    <Box sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={2}>
        {languages.map((language) => (
          <Grid item xs={12} sm={6} key={language?.value}>
            <Card
              component={motion.div}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              sx={{
                height: 250,
                background: (theme) => theme.palette.background.default,
                boxShadow: 2,
                borderRadius: 4,
                mt: 2,
                cursor: 'pointer',
              }}
              onClick={() => handleNavigation(language?.value)}
            >
              {language?.image ? (
                <Box
                  component="img"
                  src={language?.image}
                  alt={`${language.name} image`}
                  sx={{
                    width: '100%',
                    height: '70%',
                    objectFit: 'fill',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: '70%',
                    backgroundColor: language?.color, // 이미지가 없을 때 배경색 사용
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                ></Box>
              )}
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    ...kboFont,
                    color: (theme) => theme.palette.common.black,
                  }}
                >
                  {language.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
