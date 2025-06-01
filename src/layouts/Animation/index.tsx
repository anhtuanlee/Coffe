'use client';

import useAppRouter from '@Hooks/useAppRouter';
import { isPlayedState, isPlayState } from '@Layouts/Animation/animationSignal';
import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import useLogicAnimate from '@Layouts/Animation/useLogicAnimate';
import useResetPage from '@Layouts/Animation/useResetPage';
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
import Header from '../Header';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import Footer from '../Footer';

interface IProp extends PropsWithChildren {}

export default function Animate({ children }: IProp): ReactElement {
  useLogicAnimate();
  useResetPage();

  const isFirstLoader = useSignal(true);

  const router = useRouter();
  const { isHome } = useAppRouter();
  const { scrollHeight } = useWindowResize();
  const { registerLoad, unRegisterLoad } = useLoadManageSignal();
  const mainRef = React.useRef<HTMLElement>(null);

  useSignalEffect(() => {
    scrollHeight.value &&
      gsap.globalTimeline.getChildren().forEach((timeline) => {
        timeline.scrollTrigger && timeline.scrollTrigger?.refresh();
      });
  });

  useSignalEffect(() => {
    if (!inCompleteState.value) return;
    router.push(urlState.value, { scroll: true });
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    scrollRestorationManual();

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
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
    <>
      <Header />
      <main ref={mainRef}>
        {children}
        <PageLoader />
        <PageEffect />
      </main>
      <Footer />
    </>
  );
}
