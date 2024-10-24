import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { spoca2, pretendardFont } from 'package/styles/fonts/module';

const inter = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--noto_sans_kr',
  weight: '600',
});

export const metadata: Metadata = {
  title: 'Blog Chamchi',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ ...spoca2 }}>{children}</body>
    </html>
  );
}
