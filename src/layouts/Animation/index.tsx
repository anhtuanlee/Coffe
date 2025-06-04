'use client';

import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import useLogicAnimate from '@Layouts/Animation/useLogicAnimate';
import PageEffect from '@Layouts/PageEffect';
import PageLoader from '@Layouts/PageLoader';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import useWindowResize from '@/hooks/useWindowResize';
import Footer from '../Footer';
import Header from '../Header';

interface IProp extends PropsWithChildren {}

export default function Animate({ children }: IProp): ReactElement {
  useLogicAnimate();

  const { scrollHeight } = useWindowResize();
  const { registerLoad, unRegisterLoad } = useLoadManageSignal();
  const mainRef = React.useRef<HTMLElement>(null);

  useSignalEffect(() => {
    console.log('scrollHeight.value', scrollHeight.value);
    scrollHeight.value &&
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
