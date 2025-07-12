'use client';

import useAnimation from '@Hooks/useAnimation';
import useParagraphLineFade from '@Interactive/Paragraph/Line/Fade/useParagraphLineFade';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import { TypesList } from 'split-type';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  type?: TypesList;
  start?: string;
  horizontal?: boolean;
  isInPopup?: boolean;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement;

export default function ParagraphLineFade({
  children,
  delayEnter,
  delayTrigger,
  type,
  start,
  horizontal,
  isInPopup,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);

  const { animationIn, animationHide, animationOut } = useParagraphLineFade({
    refContent,
    delayTrigger,
    delayEnter,
    type,
    isInPopup,
  });

  useAnimation({
    trigger: refContent,
    initAnimation: animationHide,
    playAnimation: animationIn,
    outAnimation: animationOut,
    threshold: 20,
    start,
    horizontal,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
