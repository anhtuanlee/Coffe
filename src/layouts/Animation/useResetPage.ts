'use client';

import useAppRouter from '@Hooks/useAppRouter';
import { inCompleteState } from '@Layouts/PageEffect/pageEffectSignal';
import { useSignalEffect } from '@preact/signals-react';
import { scrollRestorationManual } from '@Utils/uiHelper';
import { ScrollTrigger } from 'gsap/all';
import { useEffect } from 'react';

import useCursorSignal from '@/components/Cursor/cursorSignal';
import { hoverProxy } from '@/modules/DetailPage/Discover/Slider';
import { useThemeSignal } from '@/stores/useThemeSignal';

const useResetPage = (): void => {
  const { resetTheme } = useThemeSignal();
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
    hoverProxy.isHover = false;
    hide();

    const timer = setTimeout(() => {
      resetTheme();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathName]);
};

export default useResetPage;
