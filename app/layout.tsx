import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "약방광개토",
  description: "왕실 비방 한정 진상품을 품은 약방광개토 MVP"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
