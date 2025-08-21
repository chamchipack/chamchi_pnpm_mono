import DividerBox from '@/components/common/divider/DividerBox';
import WebviewWrapper from '@/config/utils/webview/WebviewWrapper';
import useGetUserIdFromCookie from './hooks/useGetUserIdFromCookie';
import {
  AdvertisementSection,
  CompanyInfoSection,
  HeaderSection,
  IncomingReservationSection,
  LocationSection,
  PopularProductSection,
  PopularSellerSection,
  RecentViewedSection,
} from './section';

export default async function HomeLayout() {
  const userId = await useGetUserIdFromCookie();

  return (
    <WebviewWrapper>
      <HeaderSection />

      <AdvertisementSection />

      <DividerBox mt={6} mb={4} />

      <div className="mb-8">
        <LocationSection userId={userId} />
      </div>

      {userId ? (
        <div className="my-4 px-4">
          <IncomingReservationSection key={userId} userId={userId} />
        </div>
      ) : null}

      <div className="my-4">
        <PopularProductSection />
      </div>

      <div className="my-4">
        <PopularSellerSection userId={userId} />
      </div>

      <RecentViewedSection />

      <div className="pt-6">
        <CompanyInfoSection />
      </div>
    </WebviewWrapper>
  );
}
