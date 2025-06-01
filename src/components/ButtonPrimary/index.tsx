'use client';

import TextMask, { IHover } from '@/interactive/Hover/TextMask';
import { cn } from '@/utils/uiHelper';
import gsap from 'gsap';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

type TButtonOutline = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;
export type TButtonOutlineRef = {
  onClick: () => void;
};
const ButtonPrimary = forwardRef<TButtonOutlineRef, TButtonOutline>((props, ref) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { children, className, ...rest } = props;
  const bgRef = useRef<HTMLDivElement>(null);
  const reFuns = useRef<IHover>();

  useImperativeHandle(ref, () => {
    return {
      onClick: () => {
        console.log('onClick');
      },
    };
  });
  return (
    <button
      ref={btnRef}
      className={cn(
        'button-primary relative flex items-center justify-center overflow-hidden rounded-full bg-bg-dark p-5 !text-16 font-thin uppercase leading-none text-txt-light-white',
        className
      )}
      onMouseEnter={() => {
        gsap.killTweensOf(bgRef.current);
        reFuns.current?.onHover?.();
        gsap.fromTo(
          bgRef.current,
          {
            y: '100%',
          },
          {
            y: '0%',
            duration: 0.6,
            ease: 'power2.inOut',
          }
        );
      }}
      onMouseLeave={() => {
        gsap.killTweensOf(bgRef.current);
        reFuns.current?.onLeave();
        gsap.fromTo(
          bgRef.current,
          {
            y: '0%',
          },
          {
            y: '-100%',
            duration: 0.6,
            ease: 'power2.out',
          }
        );
      }}
      {...rest}
    >
      <div
        ref={bgRef}
        className={`group absolute inset-0 z-10 origin-top translate-y-full bg-bg-light`}
      />
      <div className={`relative z-30 group-hover:!text-txt-light-primary group-hover:delay-150`}>
        <TextMask refFuns={reFuns} isReverse immutable classNameClone="text-txt-light-primary">
          <span>{children}</span>
        </TextMask>
      </div>
    </button>
  );
});

ButtonPrimary.displayName = 'ButtonPrimary';

export default ButtonPrimary;
