import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pick-pic.co.kr';

  // 정적 페이지 경로
  const staticPages = ['/', '/store', '/populars'];

  // 동적 alias 목록 (직접 배열에 정의)
  const sellerAliases = [
    'bongseondong',
    'keikeugage-bongseondong',
    'saerounmaejang',
    'dalkomkeikeu',
  ];

  return [];
}
