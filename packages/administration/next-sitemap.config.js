/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pick-pic.co.kr',
  generateRobotsTxt: true,
  outDir: './public',

  // ✅ api 경로 전체 제외
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'), // ✅ 루트 추가
      await config.transform(config, '/store/keikeugage-bongseondong'), // ✅ 원하는 동적 주소 추가
    ];
  },
};
