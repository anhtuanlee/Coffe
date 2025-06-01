import { PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react';

// import { useThemeSignal } from '@/stores/useThemeSignal';

interface IProp extends PropsWithChildren {
  theme: 'light' | 'dark';
}
export default function WrapTheme({ theme, children }: IProp): ReactElement | ReactNode {
  // const { setCurrentTheme, setNavigateTheme } = useThemeSignal();

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     setCurrentTheme('dark');
  //     setNavigateTheme('light');
  //   } else {
  //     setCurrentTheme('light');
  //     setNavigateTheme('dark');
  //   }
  // }, []);

  return children;
}
