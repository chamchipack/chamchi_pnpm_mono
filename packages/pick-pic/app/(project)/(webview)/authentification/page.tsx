import ErrorCommonComponent from '@/components/common/layout/error/ErrorCommonComponent';
import AuthContainer from '@/components/page/Profile/profile/auth/AuthConatiner';
import { createNoMeta } from '@/config/utils/seo/seoNoMeta';
import { cookies } from 'next/headers';

export const metadata = createNoMeta('본인인증', '개인 본인인증 페이지입니다.');

interface Props {
  searchParams: {
    identityVerificationId: string;
    code: string;
    message: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const cookieStore = await cookies();

  const { value = '' } = cookieStore.get('user_id') || {};

  if (!value)
    return (
      <ErrorCommonComponent
        height="50vh"
        isBackwardAvailable={false}
        isSigninAvailable={false}
        isHomeRouteAvailable={true}
        isNativeStackInitialize={false}
      />
    );

  return <AuthContainer searchParams={searchParams} />;
};

export default Page;
