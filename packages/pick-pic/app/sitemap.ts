import { fetchAllAliases } from '@/api/server';
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

  const aliasList = await fetchAllAliases();

  return [
    // 정적 페이지들
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date().toISOString().split('T')[0],
    })),

    // 동적 store alias 페이지들
    // ...sellerAliases.map((alias) => ({
    //   url: `${baseUrl}/store/${alias}`,
    //   lastModified: new Date().toISOString().split('T')[0],
    // })),

    ...aliasList.map((alias) => ({
      url: `${baseUrl}/store/${alias}`,
      lastModified: new Date().toISOString().split('T')[0],
    })),
  ];
}
