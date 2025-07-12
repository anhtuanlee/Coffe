'use client';

import ButtonOutline from '@/components/ButtonOutline';
import LinkEffect from '@/components/LinkEffect';
import TextMask, { IHover } from '@/interactive/Hover/TextMask';
import Line from '@/interactive/Line';
import { cn } from '@/utils/uiHelper';
import { useSignalEffect } from '@preact/signals-react';
import { usePathname } from 'next/navigation';
import React, { useMemo, useRef } from 'react';
import useAnimationSignal from '../Animation/animationSignal';
import { HeaderProvider, useHeader } from './HeaderProvier';
import Menu from './Menu';

const HeaderChild = () => {
  const refFuns = useRef<IHover>();
  const refLogo = useRef<IHover>();
  const { playForPopup, resetForPopup } = useAnimationSignal();
  const { isOpenHeader, setIsOpenHeader } = useHeader();
  const [isOpenMenuState, setIsOpenMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  const isDarkHeader = useMemo(() => {
    const pathsDark = ['/about'];
    return pathsDark.includes(pathname);
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useSignalEffect(() => {
    if (isOpenHeader.value) {
      playForPopup();
      setIsOpenMenuState(true);
    } else {
      resetForPopup();
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsOpenMenuState(false);
      })();
    }
  });

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 w-full border transition-all duration-500',
        isScrolled ? 'bg-bg-light' : '',
        isDarkHeader ? 'dark' : ''
      )}
    >
      <div className={`py-[0.875rem]`}>
        <div className="container grid grid-cols-12 items-center">
          <LinkEffect href={'/'} className="z-30 col-start-1 col-end-3">
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
                <h2
                  className={cn(
                    'whitespace-nowrap font-title text-24 font-medium uppercase tracking-72 text-txt-light-primary',
                    isOpenMenuState ? 'text-txt-dark-primary' : 'text-txt-light-primary'
                  )}
                >
                  Viet Lasa
                </h2>
              </TextMask>
            </div>
          </LinkEffect>
          <div
            className="col-start-7 col-end-9"
            key={'menu'}
            onClick={() => {
              console.log('click');
              setIsOpenHeader(true);
            }}
          >
            <div
              onMouseEnter={() => {
                refFuns.current?.onHover?.();
              }}
              onMouseLeave={() => {
                refFuns.current?.onLeave?.();
              }}
            >
              <div className="mx-auto w-max">
                <TextMask refFuns={refFuns} key={'menu'}>
                  <div className="mx-auto w-max cursor-pointer text-center text-18 uppercase tracking-36 text-txt-light-primary">
                    Menu
                  </div>
                </TextMask>
              </div>
            </div>
          </div>
          <div className="col-start-14 col-end-16 justify-self-end text-18">
            <ButtonOutline mode="light" className="uppercase">
              Order online
            </ButtonOutline>
          </div>
        </div>
      </div>
      <Line color="dark-strong" direction="bottom" isCenter />
      <Menu />
    </header>
  );
};

export default function Header() {
  return (
    <HeaderProvider>
      <HeaderChild />
    </HeaderProvider>
  );
}
