import StudentFilter from '@/components/v2/Student/StudentFilter';
import StudentGrid from '@/components/v2/Student/StudentGrid';
import { getData } from '@/api/module/fetch';
import MediaQueryServerWrapper from 'package/src/hooks/mediaQueryServerWrapper';
import { Typography } from '@mui/material';
import { spoca1, spoca2, pretendardFont } from 'package/styles/fonts/module';

const MainPage = async () => {
  const params = { target: 'student', type: 'search', options: {}, sort: {} };
  const result = await getData(params);
  const initialTotalData = result?.data?.totalItems ?? 0;
  return (
    <>
      {/* <MediaQueryServerWrapper width={300} height={40}>
      </MediaQueryServerWrapper> */}
      <Typography sx={{ ...spoca1 }}>안녕하세요 반가워요</Typography>

      <Typography sx={{ ...spoca2 }}>안녕하세요 반가워요</Typography>

      <Typography sx={{ ...pretendardFont }}>안녕하세요 반가워요</Typography>

      <StudentFilter />
      <StudentGrid total={initialTotalData} />
    </>
  );
};

export default MainPage;
