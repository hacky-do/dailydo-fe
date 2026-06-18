import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { initMocks } from '@/mocks';
import { Providers } from '@/providers';

const SITE_NAME = 'Daily:DO';
const SITE_URL = 'https://www.daily-do.com';
const SITE_DESCRIPTION = '소소한 미션을 수행하며 하루를 기록하는 데일리 챌린지';
const OG_IMAGE = '/og-image.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: ['힐링', '감성', '기록', '챌린지', '미션', '일상'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="h-dvh bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
