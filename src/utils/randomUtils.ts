import { TDiscovery } from '@/constants/data-details';

/**
 * Shuffles the input array and returns the specified number of items.
 *
 * @param {TDiscovery[]} data - the input array to shuffle
 * @param {number} count - the number of items to return
 * @return {TDiscovery[]} the first 'count' items from the shuffled array
 */
export const getRandomItems = (data: TDiscovery[], count: number): TDiscovery[] => {
  const shuffled = [...data];
  let currentIndex = shuffled.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  } /*  */

  return shuffled.slice(0, count); // Return the first 'count' items
};

/**
 * Filters data based on a specific slug.
 *
 * @param {TDiscovery[]} data - the array of data to filter
 * @param {string} slug - the slug to filter by
 * @return {TDiscovery} the filtered item
 */
export const filterDataSlug = (data: TDiscovery[], slug: string): TDiscovery[] => {
  return data.filter((item) => item.slug !== slug);
};
