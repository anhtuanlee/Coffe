import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function useAppRouter(): {
  isHome: boolean;
  isWork: boolean;
  isContact: boolean;
  isServices: boolean;
  isStudio: boolean;
  isDetails: boolean;
  pathName: string;
} {
  const pathName = usePathname();
  const isHome = useMemo(() => {
    return pathName === '/';
  }, [pathName]);
  const isWork = useMemo(() => {
    return pathName === '/work';
  }, [pathName]);
  const isContact = useMemo(() => {
    return pathName === '/contact';
  }, [pathName]);
  const isStudio = useMemo(() => {
    return pathName === '/studio';
  }, [pathName]);
  const isServices = useMemo(() => {
    return pathName === '/services';
  }, [pathName]);
  const isDetails = useMemo(() => {
    return pathName.includes('/detail');
  }, [pathName]);

  return { isHome, isWork, isContact, isStudio, isServices, isDetails, pathName };
}
