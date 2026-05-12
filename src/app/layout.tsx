import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { initMocks } from '@/mocks';
import Providers from '@/providers';

export const metadata: Metadata = {
  title: 'Daily:DO',
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
      <body className="h-full">
        <Providers>
          <div className="mx-auto flex h-full max-w-107.5 min-w-90 flex-col">
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
