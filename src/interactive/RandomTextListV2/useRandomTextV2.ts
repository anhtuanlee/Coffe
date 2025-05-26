import { useIsInViewport } from '@Hooks/useIsInViewport';
import { isPlayState } from '@Layouts/Animation/animationSignal';
import { useComputed, useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { MutableRefObject, useEffect, useRef } from 'react';

type IRandTextV2 = {
  refContent: MutableRefObject<HTMLDivElement | HTMLSpanElement | null>;
  texts: string[];
};

export default function useRandomTextV2({ refContent, texts }: IRandTextV2): void {
  const refCurrent = useRef<HTMLElement>();
  const refCurrentSize = useRef<HTMLElement>();
  const idxRef = useRef<{
    index: number;
    slideInterVal: null | NodeJS.Timeout;
    dbRun: null | NodeJS.Timeout;
  }>({
    index: 0,
    slideInterVal: null,
    dbRun: null,
  });
  const { visible } = useIsInViewport({ ref: refContent });
  const isRun = useComputed(() => {
    return visible.value && isPlayState.value;
  });

  useEffect(() => {
    refContent.current?.classList.add('font-2');
  }, []);

  const runAnimation = (index: number): void => {
    if (!refCurrent.current) return;
    let interval: NodeJS.Timeout | null = null;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const text = texts[index];
    const currentText = texts[index];

    const iteration = 0;
    interval && clearInterval(interval);
    interval = setInterval(() => {
      if (!refCurrent.current) return;
      refCurrent.current.textContent = text
        .split('')
        .map((letter, index) => {
          if (index < iteration || letter === ' ') {
            return text[index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');

      setTimeout(() => {
        interval && clearInterval(interval);
        if (!refCurrent.current) return;
        refCurrent.current.textContent = currentText;
      }, 400);
    }, 30);
  };

  const runLoop = (): void => {
    if (!refCurrent.current) {
      refContent.current?.querySelectorAll('.word__clone').forEach((word) => {
        if (word.textContent === texts[0]) {
          refCurrent.current = word as HTMLElement;
          const parent = word.parentNode as HTMLElement;

          if (parent) {
            refCurrentSize.current = document.createElement('span');
            refCurrentSize.current?.classList.add('target-size');
            parent.appendChild(refCurrentSize.current);
          }
        }
      });
    }

    if (idxRef.current.slideInterVal) clearInterval(idxRef.current.slideInterVal);
    idxRef.current.slideInterVal = setInterval(() => {
      idxRef.current.index += 1;
      if (idxRef.current.index >= texts.length) idxRef.current.index = 0;
      if (refCurrentSize.current) {
        refCurrentSize.current.textContent = texts[idxRef.current.index];
        refCurrent.current &&
          gsap.to(refCurrent.current, {
            width: refCurrentSize.current?.getBoundingClientRect().width,
            ease: 'power3',
            duration: 0.3,
          });
      }

      runAnimation(idxRef.current.index);
    }, 3000);
  };

  useSignalEffect(() => {
    if (isRun.value) {
      idxRef.current.dbRun = setTimeout(runLoop, 1000);
    } else if (isPlayState.peek()) {
      idxRef.current.slideInterVal && clearInterval(idxRef.current.slideInterVal);
    }

    return () => {
      idxRef.current.dbRun && clearTimeout(idxRef.current.dbRun);
    };
  });
}
