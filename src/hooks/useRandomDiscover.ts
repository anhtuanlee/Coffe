import { useEffect, useState } from 'react';

import { DATA_DISCOVERY, TDiscovery } from '@/constants/data-details';
import { filterDataSlug, getRandomItems } from '@/utils/randomUtils';

import { usePath } from './usePath';

/**
 * Custom hook that returns random data from DATA_DISCOVERY filtered by the current slug.
 * @returns An object with a `data` property, which is an array of TDiscovery.
 */
export const useRandomDiscover = (): { data: TDiscovery[] } => {
  const [data, setData] = useState<TDiscovery[]>([]);
  const { slug } = usePath();

  useEffect(() => {
    const dataFilter: TDiscovery[] = filterDataSlug(DATA_DISCOVERY, slug as string);
    const newData: TDiscovery[] = getRandomItems(dataFilter, 3);
    setData(newData);
  }, [slug]);

  return { data };
};
