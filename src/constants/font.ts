import { Phudu, Be_Vietnam_Pro } from 'next/font/google';

export const phudu = Phudu({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-title',
  weight: ['300', '400', '500', '600', '700'],
});

export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-body',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
