import { useProductById } from '@/api/server/server-api';
import ErrorPage from '@/components/page/Error/ErrorPage';
import { DataStructureKey } from '@/types/schema/default';
import { AlertCircle } from 'lucide-react';
import Script from 'next/script';
import { CompanyInfoSection } from '../../Home/section';
import CSR_NewContainer from './product/contents/CSR_NewContainer';
import SSR_ProductDefaultInfo from './product/header/SSR_ProductDefaultInfo';
import SSR_ProductHeader from './product/header/SSR_ProductHeader';
import SSR_ProductMainImage from './product/header/SSR_ProductMainImage';

interface Props {
  productId: string;
  userId: string;
}

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 mt-4">{children}</div>
);

export default async function SSR_ProductContainer({
  productId,
  userId,
}: Props) {
  const { data: productData, vacationDates } =
    await useProductById<DataStructureKey.product>(productId);

  if (!productData) return <ErrorPage title="해당하는 상품이 없습니다!" />;

  const seller = productData.sellerId;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.name,
    image: productData.image,
    description:
      productData.description ||
      `${seller?.marketName || ''}의 맞춤형 레터링 케이크입니다.`,
    sku: productData._id,
    brand: {
      '@type': 'Brand',
      name: seller?.marketName || 'pick-pic',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KRW',
      price: productData.price || '0',
      availability: 'https://schema.org/InStock',
      url: `https://pick-pic.co.kr/store/product/${productId}`,
    },
  };

  const isDeleted = productData?.sellerId?.isDeleted;

  return (
    <>
      <Script
        id="jsonld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pb-4 pb-8">
        <div className="px-4">
          <SSR_ProductHeader
            marketName={productData?.sellerId?.marketName}
            alias={productData?.sellerId?.alias}
          />
        </div>

        <SSR_ProductMainImage image={productData?.image} />

        {isDeleted && (
          <div className="px-4 mt-4">
            <div className="mt-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded flex items-center gap-1">
              <AlertCircle size={14} className="text-gray-500" />
              <span>운영이 종료된 가게입니다</span>
            </div>
          </div>
        )}

        <Section>
          <SSR_ProductDefaultInfo productData={productData} />
        </Section>

        <div>
          <CSR_NewContainer
            product={productData}
            userId={userId}
            vacationDates={vacationDates || []}
            isDeleted={isDeleted}
          />
        </div>

        {/* <div className="px-4 mb-4">
          <ShoppingCartButton product={productData} />
        </div>
        <ShoppingCartAlert product={productData} /> */}

        <CompanyInfoSection />
      </div>
    </>
  );
}
