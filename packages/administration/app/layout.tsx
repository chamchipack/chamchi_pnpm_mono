import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: './fonts/Pretendard-Light.woff2',
  variable: '--font-pretendard',
  weight: '200',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/logo/logo3_4x.png"
          type="image/png"
          sizes="96x96"
        />
        <script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          async
        />
      </head>

      <body
        style={{ position: 'relative', width: '100%' }}
        className={`${pretendard.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
