import usePageEffectSignal, { typeState } from '@Layouts/PageEffect/pageEffectSignal';
import { usePathname } from 'next/navigation';

import { ITypeEffect } from '@/types/common';

export default function useRouterEffect(): {
  routerEffect: ({ url }: { url: string; typeEffect?: ITypeEffect }) => void;
} {
  const pathName = usePathname();
  const { animationIn } = usePageEffectSignal();
  const routerEffect = ({
    url,
    typeEffect = 'page',
  }: {
    url: string;
    typeEffect?: ITypeEffect;
  }): void => {
    if (url === pathName) return;
    typeState.value = typeEffect;
    animationIn(url);
  };

  return { routerEffect };
}
