import HomePage from '@Modules/HomePage';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    absolute: 'Home - Uncommon',
  },
  description: 'Home Page',
  icons: {
    icon: '/icon512_maskable.png',
    apple: '/icon512_rounded.png',
  },
  manifest: '/manifest.json',
};

export default function Page(): React.ReactElement {
  return <HomePage />;
}
