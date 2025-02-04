import { Box, Typography } from '@mui/material';
import Chip from './Chip';

const chips1 = [
  'React',
  'Next.js',
  'Vue',
  'Nuxt.js',
  'Apollo-Client',
  'React-Native',
];
const chips2 = ['node', 'GraphQL', 'MongoDB', 'ElasticSearch'];
const chips3 = ['Figma', 'Docker', 'Kubernetes', 'Linux', 'Nginx'];

export default function IntroductionBox() {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '50%' }, // 모바일: 전체 너비, 웹: 50%
        paddingX: { xs: '40px', md: '40px' },
        marginTop: { xs: '100px', md: '0px' },
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 가독성을 위한 투명 배경
        color: 'white',
        textAlign: 'center',
        display: { xs: 'flex', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Skill set
      </Typography>
      <Box
        marginTop="20px"
        sx={{
          display: { xs: 'flex', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          프론트엔드
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            mt: 1,
          }}
        >
          {chips1.map((item, index) => (
            <Chip name={item} key={item} index={index} />
          ))}
        </Box>
      </Box>
      <Box
        marginTop="20px"
        sx={{
          display: { xs: 'flex', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          백엔드
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            mt: 1,
          }}
        >
          {chips2.map((item, index) => (
            <Chip name={item} key={item} index={index} />
          ))}
        </Box>
      </Box>

      <Box
        marginTop="20px"
        sx={{
          display: { xs: 'flex', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          기타
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            mt: 1,
          }}
        >
          {chips3.map((item, index) => (
            <Chip name={item} key={item} index={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
