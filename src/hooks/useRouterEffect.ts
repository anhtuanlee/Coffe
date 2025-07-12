import usePageEffectSignal, { typeState } from '@Layouts/PageEffect/pageEffectSignal';
import { usePathname } from 'next/navigation';

import { ITypeEffect } from '@/types/common';

export default function useRouterEffect(): {
  routerEffect: ({ url, onClick }: { url: string; typeEffect?: ITypeEffect; onClick?: () => void }) => void;
} {
  const pathName = usePathname();
  const { animationIn } = usePageEffectSignal();
  const routerEffect = ({
    url,
    typeEffect = 'page',
    onClick,
  }: {
    url: string;
    typeEffect?: ITypeEffect;
    onClick?: () => void;
  }): void => {
    if (url === pathName) return;
    onClick?.();
    typeState.value = typeEffect;
    animationIn(url);
  };

  return { routerEffect };
}
