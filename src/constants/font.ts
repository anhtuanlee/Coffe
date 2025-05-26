import localFont from 'next/font/local';

export const neuemontreal = localFont({
  src: [
    {
      path: '../../public/fonts/PPNeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Book.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--neue-montreal',
});
