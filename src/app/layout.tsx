import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "마이링크 (MyLink) — 링크트리 클론 서비스",
  description: "누구나 3분 만에 만드는 나만의 감각적인 바이오 링크 & 실시간 모바일 프리뷰",
  openGraph: {
    title: "마이링크 (MyLink) — 모바일 최적화 바이오 링크",
    description: "실시간 모바일 프리뷰와 5종 감각적인 테마로 완성하는 프로필 링크",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full bg-[#09090b] text-white antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-white overflow-x-hidden">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
