'use client';

import TextMask, { IHover } from '@/interactive/Hover/TextMask';
import { cn } from '@/utils/uiHelper';
import gsap from 'gsap';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

type TButtonOutline = {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
  immutable?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;
export type TButtonOutlineRef = {
  onClick: () => void;
};
const ButtonOutline = forwardRef<TButtonOutlineRef, TButtonOutline>((props, ref) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reFuns = useRef<IHover>();
  const { children, className, mode = 'light', immutable = false, ...rest } = props;

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
        'button-outline group relative overflow-hidden rounded-full border border-solid border-bd-primary px-5 py-3.5 !text-16 font-normal uppercase !leading-none text-txt-light-primary',
        mode === 'light' && 'border-txt-light-primary text-txt-light-primary',
        mode === 'dark' && 'border-txt-dark-primary text-txt-dark-primary',
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
        className={`group absolute inset-0 -z-10 origin-top translate-y-full ${
          mode === 'light' ? 'bg-[#2e2a26]' : 'bg-[#f7f4f0]'
        }`}
      />
      <div
        className={`mx-auto w-max group-hover:delay-150 ${
          mode === 'light'
            ? 'group-hover:text-txt-dark-primary'
            : 'group-hover:text-txt-light-primary'
        }`}
      >
        <TextMask
          refFuns={reFuns}
          isReverse
          immutable
          classNameClone={`${!immutable ? 'text-[#f7f4f0]' : 'text-[#2e2a26]'}`}
        >
          <span>{children}</span>
        </TextMask>
      </div>
    </button>
  );
});

ButtonOutline.displayName = 'ButtonOutline';

export default ButtonOutline;
