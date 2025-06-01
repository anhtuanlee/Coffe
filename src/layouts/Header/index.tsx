'use client';

import ButtonOutline from '@/components/ButtonOutline';
import LinkEffect from '@/components/LinkEffect';
import TextMask, { IHover } from '@/interactive/Hover/TextMask';
import Line from '@/interactive/Line';
import React, { useRef } from 'react';

export default function Header() {
  const refFuns = useRef<IHover>();
  const refLogo = useRef<IHover>();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border mix-blend-difference">
      <div className="py-[1.4rem]">
        <div className="container grid grid-cols-12 items-center">
          <LinkEffect href={'/'} className="col-start-1 col-end-3">
            <div
              key={'vietlasa'}
              onMouseEnter={() => {
                refLogo.current?.onHover?.();
              }}
              onMouseLeave={() => {
                refLogo.current?.onLeave?.();
              }}
            >
              <TextMask refFuns={refLogo} key={'logo'}>
                <h2 className="whitespace-nowrap font-title text-24 font-medium uppercase tracking-72 text-txt-dark-primary">
                  Viet Lasa
                </h2>
              </TextMask>
            </div>
          </LinkEffect>
          <div className="col-start-7 col-end-9" key={'menu'}>
            <div
              onMouseEnter={() => {
                refFuns.current?.onHover?.();
              }}
              onMouseLeave={() => {
                refFuns.current?.onLeave?.();
              }}
              className="mx-auto w-max cursor-pointer text-center text-18 uppercase tracking-36 text-txt-dark-primary"
            >
              <TextMask refFuns={refFuns}>
                <span>Menu</span>
              </TextMask>
            </div>
          </div>
          <div className="col-start-14 col-end-16 justify-self-end text-18">
            <ButtonOutline mode="dark" className="uppercase" immutable>
              Order online
            </ButtonOutline>
          </div>
        </div>
      </div>
      <Line color="dark-strong" direction="bottom" isCenter />
    </header>
  );
}
