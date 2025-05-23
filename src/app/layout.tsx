import { Header } from '@/components/organisms/header';
import { server } from '@/mocks/server';
import { MSWComponent } from '@/providers/MSWComponent';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: '모여라-IT',
  description: '개발자들의 스터디, 사이트 프로젝트 모집 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  server.listen();

  return (
    <html lang="en">
      <body>
        <MSWComponent>
          <Header />
          {children}
          <Toaster />
        </MSWComponent>
      </body>
    </html>
  );
}
