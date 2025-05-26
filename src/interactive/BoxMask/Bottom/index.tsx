'use client';

import s from '@Interactive/BoxMask/Bottom/styles.module.scss';
import useBoxMaskBottom from '@Interactive/BoxMask/Bottom/useBoxMaskBottom';
import cn from 'classnames';
import React, { PropsWithChildren, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

interface IBoxMaskBottom extends PropsWithChildren, IAnimationProps {
  scale?: number;
}

export default function BoxMaskBottom({
  children,
  ease,
  duration,
  start,
  delayTrigger,
  delayEnter,
  threshold,
  scale,
}: IBoxMaskBottom): React.ReactElement {
  const refTrigger = useRef<HTMLDivElement>(null);
  const refMaskWrapper = useRef<HTMLDivElement>(null);
  const refMaskElement = useRef<HTMLDivElement>(null);
  useBoxMaskBottom({
    refTrigger,
    refMaskWrapper,
    refMaskElement,
    ease,
    duration,
    start,
    threshold,
    delayTrigger,
    delayEnter,
    scale,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return (
    <div className={cn(s.boxMaskBottomWrapper, 'js-boxMaskBottomWrapper')} ref={refTrigger}>
      <div ref={refMaskWrapper} className={s.boxMaskBottom}>
        {React.cloneElement(children, {
          ...{
            ref: refMaskElement,
            className: `${children.props.className || ''}`,
          },
        })}
      </div>
    </div>
  );
}
