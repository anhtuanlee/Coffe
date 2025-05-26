import { MetadataRoute } from 'next';

import { DOMAIN_URL } from '@/constants/common';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  };
}
