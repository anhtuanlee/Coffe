import '../styles/app.scss';

import MainLayout from '@Layouts/MainLayout';
import type { Metadata, Viewport } from 'next';
import React from 'react';

import { DOMAIN_URL } from '@/constants/common';
import { beVietnamPro, phudu } from '@/constants/font';

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  applicationName: 'Viet Lasa',
  title: {
    default: 'Home',
    template: '%s - Viet Lasa',
  },
  description: 'We specialise in crafting digital experiences that elevate your business.',
  icons: {
    icon: '/icon512_maskable.png',
    apple: '/icon512_rounded.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Viet Lasa',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Viet Lasa',
    title: {
      default: 'Viet Lasa',
      template: '%s - Viet Lasa',
    },
    images: [
      {
        url: '/images/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Viet Lasa',
      },
    ],
    description: 'We specialise in crafting digital experiences that elevate your business.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}): React.ReactElement {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} ${phudu.variable}`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
export const viewport: Viewport = {
  themeColor: '#000',
};
