import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/organisms/header";


export const metadata: Metadata = {
  title: "모여라-IT",
  description: "개발자들의 스터디, 사이트 프로젝트 모집 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
