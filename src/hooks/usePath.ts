import { useParams, usePathname } from 'next/navigation';

import { NAV_ITEM, TNavItem } from '@/constants/navItems';

type TUsePath = () => {
  path: {
    name: string;
    link: string;
  };

  othersPath: {
    name: string;
    link: string;
  }[];
  slug: string | string[];
};

export const usePath: TUsePath = () => {
  const pathName: string = usePathname();
  const { slug } = useParams();

  const current = NAV_ITEM[pathName as keyof TNavItem];
  const otherItems: { name: string; link: string }[] = Object.values(
    Object.fromEntries(Object.entries(NAV_ITEM).filter(([key]) => key !== pathName))
  );

  return { path: current, othersPath: otherItems, slug: slug };
};
