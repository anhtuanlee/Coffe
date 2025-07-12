import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useRef } from 'react';
import SplitType, { TypesList } from 'split-type';

import { IAnimationElement } from '@/types/common';

import s from './styles.module.scss';

interface IUseParagraphScroller {
  refContent: MutableRefObject<IAnimationElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  type?: TypesList;
  isInPopup?: boolean;
}

export default function useParagraphLineFade({
  refContent,
  delayTrigger,
  delayEnter,
  type,
  isInPopup,
}: IUseParagraphScroller): {
  animationHide: () => void;
  animationIn: (delay?: number) => void;
  animationOut: () => void;
} {
  const { contextSafe } = useGSAP();
  const refText = useRef<SplitType | null>(null);
  const getDelayCallBack = useCallback((): number => {
    return getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger, isInPopup });
  }, []);
  const pageHide = contextSafe(() => {
    refContent.current?.classList.add(s.lineFade);
    refText.current = new SplitType(refContent.current as HTMLElement, {
      types: type || 'lines,words',
    });
    gsap.killTweensOf(refText.current.words);
    gsap.set(refText.current.words, { y: '100%', opacity: 0, overwrite: 'auto' });
  });

  const animationIn = contextSafe((delayIn?: number) => {
    const mDelayIn = typeof delayIn !== 'number' ? 0 : delayIn;

    const delay = getDelayCallBack();
    refText.current?.lines &&
      refText.current?.lines.forEach((lines, key) => {
        const char = lines.querySelectorAll('.word');
        gsap.to(char, {
          y: '0%',
          opacity: 1,
          stagger: 0.025,
          delay: (mDelayIn || delay) + key / 8,
          ease: 'power3.out',
          duration: 1.2,
          overwrite: 'auto',
        });
      });
  });

  const animationOut = contextSafe(() => {
    const delay = getDelayCallBack();
    refText.current?.lines &&
      refText.current?.lines.forEach((lines, key) => {
        const char = lines.querySelectorAll('.word');
        gsap.to(char, {
          y: '-105%',
          opacity: 1,
          stagger: 0.025,
          delay: delay + key / 8,
          ease: 'power3.out',
          duration: 1.2,
          overwrite: 'auto',
        });
      });
  });
  return { animationHide: pageHide, animationIn, animationOut };
}
