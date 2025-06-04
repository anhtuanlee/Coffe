'use client';

import cn from 'classnames';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import s from './styles.module.scss';

import useMouse from '@/hooks/useMouse';
import { IAnimationProps } from '@/types/animation';
import { MathLerp } from '@/utils/mathUtils';
import { convertRemToPx } from '@/utils/uiHelper';
import { useSignal } from '@preact/signals-react';
import gsap from 'gsap';

export interface IBoxSnap extends PropsWithChildren, IAnimationProps {
  scale?: number;
  rangeSnap?: number;
  className?: string;
  /**
   * @description control the range of the snap
   * @default 0.035
   * @enum {number}
   * @min 0.035
   * @max 0.05
   */
  lerpIn?: number;
  /**
   * @description control the range of the snap
   * @default 0.05
   * @enum {number}
   * @min 0.035
   * @max 0.05
   */
  lerpOut?: number;
}

export default function BoxSnap({
  children, // ease,
  className, // duration,
  scale = 3, // start,
  lerpIn = 0.035,
  lerpOut = 0.05,
}: IBoxSnap): React.ReactElement {
  const refTrigger = useRef<HTMLDivElement>(null);
  const refSnap = useRef<HTMLDivElement>(null);
  const mouse = useMouse();
  const refGsap = useRef<{
    x: Function | null;
    y: Function | null;
  }>({
    x: null,
    y: null,
  });
  const isHover = useSignal(false);

  const handleWrapEnter = () => {
    isHover.value = true;
  };
  const handleWrapLeave = () => {
    isHover.value = false;
  };

  useEffect(() => {
    const childInner = refSnap?.current?.querySelector('[data-child-inner]');
    const circle = refSnap?.current?.querySelector('[data-circle]');

    const update = () => {
      let targetX;
      let targetY;
      let lerpVal;
      let toScale;
      if (isHover.value) {
        let wrapHeadRect = refTrigger?.current?.getBoundingClientRect() as DOMRect;
        targetX =
          gsap.utils.clamp(0, wrapHeadRect.width, mouse.value.x - wrapHeadRect.left) /
          wrapHeadRect.width;
        targetX = (targetX - 0.5) * 2;
        targetY =
          gsap.utils.clamp(0, wrapHeadRect.height, mouse.value.y - wrapHeadRect.top) /
          wrapHeadRect.height;
        targetY = (targetY - 0.5) * 2;
        lerpVal = lerpIn || 0.035;
        toScale = 1.1;
      } else {
        targetX = 0;
        targetY = 0;
        lerpVal = lerpOut || 0.05;
        toScale = 1;
      }
      if (refSnap.current)
        rotateMouseMove({
          pointerX: targetX,
          pointerY: targetY,
          lerpVal,
          element: refSnap.current as HTMLDivElement,
        });

      if (circle) {
        rotateMouseMoveWithScale({
          pointerX: targetX * 1.5,
          pointerY: targetY * 1.5,
          lerpVal: lerpVal / 2,
          element: circle as HTMLDivElement,
          toScale,
        });
      }
      if (childInner) {
        rotateMouseMoveWithScale({
          pointerX: targetX,
          pointerY: targetY,
          lerpVal: lerpVal / 2,
          element: childInner as HTMLDivElement,
          toScale,
        });
      }
      requestAnimationFrame(update);
    };
    update();
  }, []);

  const rotateMouseMove = ({
    pointerX,
    pointerY,
    lerpVal,
    element,
  }: {
    pointerX: number;
    pointerY: number;
    lerpVal: number;
    element: HTMLDivElement;
  }) => {
    let curPosX = gsap.getProperty(element, 'x');
    let toPosX = pointerX * convertRemToPx(scale || 2);
    let targetPosX = MathLerp(Number(curPosX), toPosX, lerpVal);

    let curPosY = gsap.getProperty(element, 'y');
    let toPosY = pointerY * convertRemToPx(scale || 2);
    let targetPosY = MathLerp(Number(curPosY), toPosY, lerpVal);

    gsap.quickSetter(element, 'x', 'px')(targetPosX);
    gsap.quickSetter(element, 'y', 'px')(targetPosY);
  };
  const rotateMouseMoveWithScale = ({
    pointerX,
    pointerY,
    lerpVal,
    element,
    toScale,
  }: {
    pointerX: number;
    pointerY: number;
    lerpVal: number;
    element: HTMLDivElement;
    toScale: number;
  }) => {
    let curPosX = gsap.getProperty(element, 'x');
    let toPosX = pointerX * convertRemToPx(scale || 2);
    let targetPosX = MathLerp(Number(curPosX), toPosX, lerpVal);

    let curPosY = gsap.getProperty(element, 'y');
    let toPosY = pointerY * convertRemToPx(scale || 2);
    let targetPosY = MathLerp(Number(curPosY), toPosY, lerpVal);

    let curScale = gsap.getProperty(element, 'scale');
    let targetScale = MathLerp(Number(curScale), toScale, lerpVal);

    gsap.quickSetter(element, 'x', 'px')(targetPosX);
    gsap.quickSetter(element, 'y', 'px')(targetPosY);
    gsap.quickSetter(element, 'scaleX')(targetScale);
    gsap.quickSetter(element, 'scaleY')(targetScale);
  };

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return (
    <div
      onMouseEnter={handleWrapEnter}
      onMouseLeave={handleWrapLeave}
      className={cn(s.boxSnapWrapper, 'cursor-pointer', className)}
      ref={refTrigger}
    >
      <div ref={refSnap} className={s.boxSnap}>
        {React.cloneElement(children, {
          ...{
            ref: refSnap,
            className: `${children.props.className || ''}`,
          },
        })}
      </div>
    </div>
  );
}
