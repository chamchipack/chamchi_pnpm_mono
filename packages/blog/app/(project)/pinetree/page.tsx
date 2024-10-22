import { Metadata } from 'next';
import ContentListContainer from '@/components/main/server/ContentListContainer';

export const metadata: Metadata = {
  title: '블로그 참치',
  description: '내가 만든 내 세상. 블로그 참치',
  keywords: ['포트폴리오', '블로그', 'blog', '작성'],
  alternates: {
    canonical: 'https://blog.chamchipack.com',
  },
};

export default function Page() {
  return <ContentListContainer />;
}
