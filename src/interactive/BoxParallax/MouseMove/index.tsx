'use client';

import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { useIsInViewport } from '@Hooks/useIsInViewport';
import useMouse from '@Hooks/useMouse';
import { useSignalEffect } from '@preact/signals-react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import s from './styles.module.scss';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  velocity?: number;
  offset?: number;
  isObserver?: boolean;
}

export default function BoxParallaxMouseMove({
  children,
  velocity = -200,
  offset,
  delayEnter,
  delayTrigger,
  isObserver,
}: ParagraphLineMaskProps): ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refMask = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refSetter = useRef<{ qX: null | gsap.QuickToFunc; qY: null | gsap.QuickToFunc }>({
    qX: null,
    qY: null,
  });
  const refOffset = useRef<undefined | number>(offset);
  const mouse = useMouse();

  const { visible: isInview } = useIsInViewport({ ref: refWrap });

  useSignalEffect(() => {
    if (!isInview.value) return;
    const disX = mouse.value.x / window.innerWidth - 0.5;
    const disY = mouse.value.y / window.innerHeight - 0.5;
    if (refOffset.current) {
      refSetter.current.qX && refSetter.current.qX(disX * velocity * refOffset.current);
      refSetter.current.qY && refSetter.current.qY(disY * velocity * refOffset.current);
    }
  });

  const { contextSafe } = useGSAP(() => {
    refSetter.current.qX = gsap.quickTo(refWrap.current, 'x', {
      duration: 0.5,
      ease: 'power3',
    });
    refSetter.current.qY = gsap.quickTo(refWrap.current, 'y', {
      duration: 0.5,
      ease: 'power3',
    });
  });

  const initAnimation = contextSafe(() => {
    refMask.current &&
      gsap.set(refMask.current, { '--clipPath': ' inset(100% 0% 0% 0%)', scale: 1.2 });
  });

  const playAnimation = contextSafe(() => {
    refOffset.current = refOffset.current || Math.random();
    const delay = getDelay({ delayEnter, delayTrigger, refContentCurrent: refContent.current });
    gsap.to(refMask.current, {
      delay,
      '--clipPath': ' inset(0% 0% 0% 0%)',
      ease: 'power3.inOut',
      duration: 1,
      overwrite: 'auto',
    });
  });

  useAnimation({
    trigger: refWrap,
    initAnimation,
    playAnimation,
    threshold: 50,
    isObserver,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return (
    <div className={s.moueMove} ref={refWrap}>
      <div className={`${s.moueMove_mask} w-full h-full`} ref={refMask}>
        {React.cloneElement(children, { ...{ ref: refContent } })}
      </div>
    </div>
  );
}
