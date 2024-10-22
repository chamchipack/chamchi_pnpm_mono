/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 타입스크립트 오류를 무시하고 빌드를 진행
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pinetree',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090', // PocketBase 서버가 실행 중인 포트
        pathname: '/api/files/**', // 파일 경로를 허용하는 패턴
      },
    ],
  },
};

export default nextConfig;
