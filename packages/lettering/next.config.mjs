/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    // 타입스크립트 오류를 무시하고 빌드를 진행
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src * 'self' data: blob: 'unsafe-inline' 'unsafe-eval' https://oapi.map.naver.com https://*.naver.com;",
          },
        ],
      },
      {
        source: '/location',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/application/home',
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.chamchipack.com',
        // port: '8090', // PocketBase 서버가 실행 중인 포트
        pathname: '/api/files/**', // 파일 경로를 허용하는 패턴
      },
    ],
  },
};

export default nextConfig;
