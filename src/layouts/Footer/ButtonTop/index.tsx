'use client';

import BoxCircle from '@/components/BoxCircle';
import ButtonOutline from '@/components/ButtonOutline';
import ArrowUp from '@/components/Icons/arrow-up';
import BoxSnap from '@/interactive/BoxSnap/Bottom';
import TextMask, { IHover } from '@/interactive/Hover/TextMask';
import { useRef } from 'react';

export default function ButtonTop() {
  const handleClick = () => {
    window.lenisRoot.current?.scrollTo(0, {
      duration: 2,
    });
  };
  const refFuns = useRef<IHover>();
  return (
    <BoxCircle
      className="aspect-square w-12"
      lerpIn={0.05}
      lerpOut={0.1}
      colorCircle="bg-transparent border-bd-dark-strong"
      scale={0.3}
    >
      <div
        onClick={handleClick}
        onMouseEnter={() => refFuns.current?.onHover?.()}
        onMouseLeave={() => refFuns.current?.onLeave?.()}
        className="flex h-12 w-12 items-center justify-center"
      >
        <div className="h-6 w-6">
          <TextMask refFuns={refFuns}>
            <ArrowUp />
          </TextMask>
        </div>
      </div>
    </BoxCircle>
  );
}
