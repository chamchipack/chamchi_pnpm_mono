/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    // 타입스크립트 오류를 무시하고 빌드를 진행
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/main',
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
