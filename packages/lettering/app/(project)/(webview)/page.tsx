import ErrorPage from '@/components/Error/ErrorPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '애플리케이션 홈',
  description: '레터링케이크, 애플리케이션 홈',
  keywords: ['케이크'],
  alternates: {
    canonical: 'https://lettering.chamchipack.com',
  },
};

interface Props {
  searchParams: {
    id: string;
  };
}
const Page = ({ searchParams }: Props) => {
  return <ErrorPage />;
};

export default Page;
