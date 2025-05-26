import '../styles/app.scss';

import MainLayout from '@Layouts/MainLayout';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import React from 'react';

import { DOMAIN_URL } from '@/constants/common';
import { neuemontreal } from '@/constants/font';

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL || 'https://uncommonstudio.com.au'),
  applicationName: 'Uncommon',
  title: {
    default: 'Uncommon',
    template: '%s - Uncommon',
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
    title: 'Uncommon',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Uncommon',
    emails: ['hola@uncommonstudio.com.au'],
    url: DOMAIN_URL || 'https://uncommonstudio.com.au/',
    title: {
      default: 'Uncommon',
      template: '%s - Uncommon',
    },
    images: [
      {
        url: '/images/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Uncommon',
      },
    ],
    description: 'We specialise in crafting digital experiences that elevate your business.',
  },
  twitter: {
    card: 'summary',
    title: {
      default: 'Uncommon',
      template: '%s - Uncommon',
    },
    images: [
      {
        url: '/images/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Uncommon',
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
    <html lang="en">
      <body className={`${neuemontreal.variable}`}>
        <MainLayout>{children}</MainLayout>
      </body>
      <GoogleAnalytics gaId="G-FVEY1D1FMP" />
    </html>
  );
}
export const viewport: Viewport = {
  themeColor: '#000',
};
