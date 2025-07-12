'use client';

import useLoadManageSignal, { loadedSate } from '@Layouts/Animation/loadManageSignal';
import useLogicAnimate from '@Layouts/Animation/useLogicAnimate';
import PageEffect from '@Layouts/PageEffect';
import PageLoader from '@Layouts/PageLoader';
import { useComputed, useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import useWindowResize from '@/hooks/useWindowResize';
import Footer from '../Footer';
import Header from '../Header';
import { ScrollTrigger } from 'gsap/all';
import { inCompleteState, urlState } from '../PageEffect/pageEffectSignal';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

interface IProp extends PropsWithChildren {}

export default function Animate({ children }: IProp): ReactElement {
  useLogicAnimate();

  const { scrollHeight } = useWindowResize();
  const { registerLoad, unRegisterLoad } = useLoadManageSignal();
  const mainRef = React.useRef<HTMLElement>(null);
  const router = useRouter();
  const debounceScroll = useComputed(() => {
    return debounce(() => {
      return scrollHeight.value;
    }, 300);
  });
  useSignalEffect(() => {
    debounceScroll.value() &&
      gsap.globalTimeline.getChildren().forEach((timeline) => {
        timeline.scrollTrigger && timeline.scrollTrigger?.refresh();
      });
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

  useSignalEffect(() => {
    if (!inCompleteState.value) return;
    document.documentElement.classList.add('is-loading');
    router.push(urlState.value, { scroll: true });
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
