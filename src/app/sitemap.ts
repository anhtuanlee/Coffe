import { MetadataRoute } from 'next';

import { DOMAIN_URL } from '@/constants/common';
import { ROUTE } from '@/constants/data-route';
import { getDetailData } from '@/utils/fetchData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await getDetailData();
  const detailEntry: MetadataRoute.Sitemap = response.map(({ slug }) => ({
    url: `${DOMAIN_URL}${ROUTE.DETAILS}/${slug}`,
    priority: 1,
    changeFrequency: 'monthly',
  }));
  return [
    {
      url: DOMAIN_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${DOMAIN_URL}${ROUTE.STUDIO}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}${ROUTE.SERVICES}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}${ROUTE.WORK}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...detailEntry,
  ];
}
