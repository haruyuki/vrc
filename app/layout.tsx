import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import Head from "next/head";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Haru VRC Model Texture Commissions',
  description: 'A site to showcase completed works by Haru.',
    openGraph: {
        title: "Haru's VRChat Model Texturing Gallery",
        description: "A site to showcase completed works by Haru",
        images: [{ url: '/assets/images/showcase.webp' }],
        url: 'https://vrc.haruyuki.moe/',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Haru's VRChat Model Texturing Gallery",
        description: "A site to showcase completed works by Haru",
        images: ['/assets/images/showcase.webp'],
        site: 'https://vrc.haruyuki.moe/',
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
    <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta property="og:url" content="https://vrc.haruyuki.moe/" />
        <meta name="twitter:url" content="https://vrc.haruyuki.moe/" />
    </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
