import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Daily:DO',
};

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="h-full">
        <div className="mx-auto flex h-full max-w-107.5 min-w-90 flex-col">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
