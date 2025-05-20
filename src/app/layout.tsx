import { Header } from '@/components/organisms/header';
import { MSWComponent } from '@/providers/MSWComponent';
import { QueryProvider } from '@/providers/query-client-provider';
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
  return (
    <html lang="en">
      <body>
        <MSWComponent>
          <QueryProvider>
            <Header />
            {children}
            <Toaster />
          </QueryProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
