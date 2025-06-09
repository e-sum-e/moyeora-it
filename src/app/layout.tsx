import { Header } from '@/components/organisms/header';
import AutoLoginManager from '@/features/auth/components/AutoLoginManager';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { WebSocketProvider } from '@/providers/WSProvider';
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
        <ReactQueryProvider>
          <Header />
          <WebSocketProvider>
            <div className="w-full md:max-w-[1280px] mx-auto px-4">
              {children}
            </div>
          </WebSocketProvider>
        </ReactQueryProvider>
        <Toaster />
        <AutoLoginManager />
      </body>
    </html>
  );
}
