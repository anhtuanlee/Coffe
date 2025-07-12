'use client';

import useAnimation from '@Hooks/useAnimation';
import useParagraphLineMask from '@Interactive/Paragraph/Line/Mask/useParagraphLineMask';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement;

const ParagraphLineMask = ({
  children,
  delayEnter,
  delayTrigger,
  start,
  horizontal,
  markers,
  isObserver,
  threshold,
  isInPopup,
}: ParagraphLineMaskProps): ReactElement => {
  const refContent = useRef<typeRef>(null);

  const {
    animationIn: playAnimation,
    animationHide: initAnimation,
    animationOut: outAnimation,
  } = useParagraphLineMask({
    refContent,
    delayTrigger,
    delayEnter,
    isInPopup,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    outAnimation,
    threshold,
    horizontal,
    isObserver,
    start,
    markers,
    isInPopup,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
};
export default ParagraphLineMask;
