import { fetcher } from '@/config/utils/fetch/base';
import { SWRConfig } from 'swr';
import Providers from './Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        {children}
      </SWRConfig>
    </Providers>
  );
}
