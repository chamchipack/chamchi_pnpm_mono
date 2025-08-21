import ErrorCommonComponent from '@/components/common/layout/error/ErrorCommonComponent';

export default function Page() {
  return (
    <ErrorCommonComponent
      height={'50vh'}
      isBackwardAvailable={false}
      isSigninAvailable={false}
      isHomeRouteAvailable={true}
      isNativeStackInitialize={false}
    />
  );
}
