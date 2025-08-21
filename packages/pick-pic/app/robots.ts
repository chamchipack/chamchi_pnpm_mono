import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: [
        'Googlebot',
        'Yeti',
        'Bingbot',
        'Daumoa',
        'Slurp',
        'Baiduspider',
        'Applebot',
        'zumbot',
        'facebookexternalhit',
      ],
      allow: ['/', '/populars', '/store'],
      disallow: [
        '/api',
        '/user',
        '/authentification',
        '/policy',
        '/login',
        '/auth',
        '/splash',
      ],
    },
    sitemap: 'https://pick-pic.co.kr/sitemap.xml',
  };
}
