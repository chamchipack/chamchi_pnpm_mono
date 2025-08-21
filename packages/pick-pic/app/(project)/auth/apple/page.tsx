import { redirect } from 'next/navigation';
import Container from './Container';

const Page = ({
  searchParams,
}: {
  searchParams: {
    email: string;
  };
}) => {
  const { email } = searchParams;

  if (!email) redirect('/error'); // 필수값이 없을 경우 리디렉션

  return <Container email={email} />;
};

export default Page;
