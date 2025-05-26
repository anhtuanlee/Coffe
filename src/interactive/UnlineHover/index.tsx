'use client';

import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import useUnlineHover from '@Interactive/UnlineHover/useUnlineHover';
import { gsap } from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

interface ParagraphLineMaskProps extends PropsWithChildren {
  duration?: number;
  color?: 'black-grey' | 'white';
  isAnimation?: boolean;
  delay?: number;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement;

export default function Underline({
  children,
  duration,
  color,
  isAnimation,
  delay,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);
  const { contextSafe } = useGSAP();
  useUnlineHover({ refContent, duration, color });

  const initAnimation = contextSafe((): void => {
    isAnimation && gsap.set(refContent.current, { opacity: 0, y: 20 });
  });

  const inAnimation = contextSafe((): void => {
    isAnimation &&
      gsap.to(refContent.current, {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 0.6,
        delay: delay || 0,
      });
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation: inAnimation,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return React.cloneElement(children, {
    ...{ ref: refContent },
  });
}
