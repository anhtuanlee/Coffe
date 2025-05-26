'use client';

import useAppRouter from '@Hooks/useAppRouter';
import { isPlayedState, isPlayState } from '@Layouts/Animation/animationSignal';
import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import useLogicAnimate from '@Layouts/Animation/useLogicAnimate';
import useResetPage from '@Layouts/Animation/useResetPage';
import useHeaderSignal from '@Layouts/Header/useHeaderSignal';
import PageEffect from '@Layouts/PageEffect';
import { inCompleteState, urlState } from '@Layouts/PageEffect/pageEffectSignal';
import PageLoader from '@Layouts/PageLoader';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import { useSignalEffectDeps } from '@Utils/signalUtils';
import { gRefresh, scrollRestorationManual } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';

import useWindowResize, { useIsDesktop } from '@/hooks/useWindowResize';

interface IProp extends PropsWithChildren {}
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  scrollRestorationManual();

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}
export default function Animate({ children }: IProp): ReactElement {
  useLogicAnimate();
  useResetPage();

  const isFirstLoader = useSignal(true);

  const router = useRouter();
  const { isHome } = useAppRouter();
  const { visibleHeader } = useHeaderSignal();
  const { scrollHeight } = useWindowResize();
  const { registerLoad, unRegisterLoad } = useLoadManageSignal();
  const isDesktop = useIsDesktop();
  const mainRef = React.useRef<HTMLElement>(null);

  useSignalEffectDeps(() => {
    isFirstLoader.value = !isHome && !isPlayedState.value && !isPlayState.value;
    visibleHeader(!isHome || !isDesktop);
  }, [isHome, isDesktop]);

  useSignalEffect(() => {
    scrollHeight.value && gRefresh();
  });

  useSignalEffect(() => {
    if (!inCompleteState.value) return;
    router.push(urlState.value, { scroll: true });
  });

  useEffect(() => {
    registerLoad();
    const fontReady = setInterval(async () => {
      if (await document.fonts.ready) {
        clearInterval(fontReady);
        unRegisterLoad();
      }
    }, 10);

    return () => {
      clearInterval(fontReady);
      unRegisterLoad();
    };
  });

  return (
    <main ref={mainRef}>
      {children}
      <PageLoader />
      <PageEffect />
    </main>
  );
}
