'use client';

import { isPlayState } from '@Layouts/Animation/animationSignal';
import { useSignalEffect } from '@preact/signals-react';
import Lenis from '@studio-freight/lenis';
import { ReactLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface ISmoothScroller extends PropsWithChildren {}

export default function LenisScroller({ children }: ISmoothScroller): React.ReactElement {
  const lenisRef = useRef<Lenis>();

  useEffect(() => {
    function update(time: number): void {
      lenisRef.current?.raf(time * 1000);
    }

    const onScrolling = (): void => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(update);
    window.lenisRoot = lenisRef;
    window.lenisRoot.current?.on('scroll', onScrolling);
    return () => {
      window.lenisRoot.current?.off('scroll', onScrolling);
      gsap.ticker.remove(update);
    };
  }, []);

  useSignalEffect(() => {
    if (isPlayState.value) {
      lenisRef.current?.start();
    } else {
      lenisRef.current?.stop();
    }
  });

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {children}
    </ReactLenis>
  );
}
