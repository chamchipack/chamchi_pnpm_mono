'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Script from 'next/script';
import ThemeProviders from './ThemeProvider';
import { SWRConfig } from 'swr';
import { fetcher } from '@/config/utils/fetch/base';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ThemeProviders>
        <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
          <CssBaseline />
          {children}
        </SWRConfig>
      </ThemeProviders>
    </RecoilRoot>
  );
}
