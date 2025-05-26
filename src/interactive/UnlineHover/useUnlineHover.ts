import { useGSAP } from '@gsap/react';
import s from '@Interactive/UnlineHover/sytles.module.scss';
import { gsap } from 'gsap';
import { MutableRefObject, useRef } from 'react';

import { IAnimationElement } from '@/types/common';

interface IProps {
  refContent: MutableRefObject<IAnimationElement | null>;
  duration?: number;
  color?: 'black-grey' | 'white';
}
export default function useUnlineHover({ refContent, duration = 0.4, color = 'white' }: IProps): {
  initAnimation: () => void;
  playAnimation: (d?: number) => void;
} {
  const refContentLine = useRef<HTMLSpanElement[]>();
  const { contextSafe } = useGSAP(
    () => {
      refContentLine.current = [];
      refContent.current?.classList.add(s.textUnderline);
      refContent.current?.classList.add(s[`textUnderline__${color}`]);
      const spanLine_1 = document.createElement('span');
      const spanLine_2 = document.createElement('span');

      spanLine_1.classList.add(s.textUnderline_line, 'textUnderline_line');
      spanLine_2.classList.add(
        s.textUnderline_line,
        s.textUnderline_line__clone,
        'textUnderline_line'
      );

      refContentLine.current?.push(spanLine_1);
      refContentLine.current?.push(spanLine_2);

      refContent.current?.append(spanLine_1);
      refContent.current?.append(spanLine_2);
      refContent.current?.addEventListener('mouseenter', onMouseEnter);

      return () => {
        spanLine_1.remove();
        spanLine_2.remove();

        refContent.current?.removeEventListener('mouseenter', onMouseEnter);
      };
    },
    { scope: refContent, dependencies: [] }
  );

  const onMouseEnter = contextSafe((): void => {
    refContentLine.current &&
      gsap.fromTo(
        refContentLine.current,
        { xPercent: 0 },
        {
          xPercent: 100,
          ease: 'power3.inOut',
          duration: duration,
          stagger: 0.15,
          overwrite: 'auto',
        }
      );
  });

  const initAnimation = contextSafe((): void => {
    refContentLine.current &&
      gsap.set(refContentLine.current, {
        xPercent: -100,
      });
  });

  const playAnimation = contextSafe((delay = 0): void => {
    refContentLine.current &&
      gsap.fromTo(
        refContentLine.current,
        { xPercent: -100 },
        { xPercent: 0, ease: 'power3.out', delay, stagger: 0.15, duration: 0.8 }
      );
  });

  return { initAnimation, playAnimation };
}
