import HomeModule from '@/modules/home';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    absolute: 'Home - VIET LASA',
  },
  description: 'Home Page',
};

export default function Page(): React.ReactElement {
  return <HomeModule />;
}
