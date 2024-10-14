import StudentFilter from '@/components/v2/Student/StudentFilter';
import StudentGrid from '@/components/v2/Student/StudentGrid';
import { getData } from '@/api/module/fetch';
import MediaQueryServerWrapper from 'package/src/hooks/mediaQueryServerWrapper';

const MainPage = async () => {
  const params = { target: 'student', type: 'search', options: {}, sort: {} };
  const result = await getData(params);
  const initialTotalData = result?.data?.totalItems ?? 0;
  return (
    <>
      {/* <MediaQueryServerWrapper width={300} height={40}>
      </MediaQueryServerWrapper> */}
      <StudentFilter />
      <StudentGrid total={initialTotalData} />
    </>
  );
};

export default MainPage;
