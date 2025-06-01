'use client';

import useAppRouter from '@Hooks/useAppRouter';
import { inCompleteState } from '@Layouts/PageEffect/pageEffectSignal';
import { useSignalEffect } from '@preact/signals-react';
import { scrollRestorationManual } from '@Utils/uiHelper';
import { ScrollTrigger } from 'gsap/all';
import { useEffect } from 'react';

import useCursorSignal from '@/components/Cursor/cursorSignal';

const useResetPage = (): void => {
  const { pathName } = useAppRouter();
  const { hide } = useCursorSignal();
  useSignalEffect(() => {
    if (inCompleteState.value) {
      ScrollTrigger.killAll();
      scrollRestorationManual();
      window.lenisRoot.current?.scrollTo(0);
      window.scrollTo(0, 0);
    }
  });

  useEffect(() => {
    scrollRestorationManual();
    hide();

    const timer = setTimeout(() => {}, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathName]);
};

export default useResetPage;
