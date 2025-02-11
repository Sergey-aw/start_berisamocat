import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
 
 
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Берисамокат — оставить заявку на франшизу",
  description: "Сервис шеринга электросамокатов и франшиза",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
      </body>
      <GoogleAnalytics gaId="G-QDM4X94J8P" />
    </html>
  );
}
