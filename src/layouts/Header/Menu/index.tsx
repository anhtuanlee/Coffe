import BoxCircle from '@/components/BoxCircle';
import ButtonOutline from '@/components/ButtonOutline';
import Close from '@/components/Icons/close';
import ImagePlaceholder from '@/components/ImagePlaceHolder';
import LinkEffect from '@/components/LinkEffect';
import { ROUTE_MENU, ROUTE_SOCIAL } from '@/constants/data-route';
import { delay_trigger } from '@/constants/delay';
import { SUB_CONTENTS } from '@/constants/infor';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import Line from '@/interactive/Line';
import { ItemSubFooter } from '@/layouts/Footer';
import Link from 'next/link';
import { useHeader } from '../HeaderProvier';
import { useRef } from 'react';
import { useSignalEffect } from '@preact/signals-react';
import BoxMaskLeft from '@/interactive/BoxMask/Left';

export default function Menu() {
  const { isOpenHeader, setIsOpenHeader } = useHeader();
  const menuRef = useRef<HTMLDivElement>(null);

  useSignalEffect(() => {
    if (isOpenHeader.value) {
      menuRef.current?.classList.add('is-open');
    } else {
      (async function () {
        await new Promise((resolve) => setTimeout(resolve, 400));
        menuRef.current?.classList.remove('is-open');
      })();
    }
  });
  return (
    <div
      className="pointer-events-none fixed inset-0 h-screen w-screen bg-bg-light opacity-0 transition-all duration-500"
      ref={menuRef}
    >
      <div className="container grid h-full w-full grid-cols-12">
        <div className="relative col-start-1 col-end-8 -mr-[var(--padding-container)] flex h-full flex-row">
          <div className="pointer-events-none absolute inset-0 -ml-[var(--size-open-container)] bg-bg-dark"></div>
          <div className="mt-auto flex flex-1 flex-col p-12">
            <div className="flex w-full flex-col gap-6">
              {SUB_CONTENTS.map((item, index) => (
                <div key={item.label}>
                  <ItemSubFooter {...item} key={item.label} index={index} isInPopup />
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-20 ml-auto flex h-full flex-1 flex-col pl-12">
            <div className="absolute left-0 top-0 h-full w-[1px]">
              <Line direction="left" color="dark-strong" delayTrigger={0} isInPopup duration={1} />
            </div>
            <div className="mr-12 flex flex-1 flex-col justify-center gap-[min(5.729vh,4rem)]">
              {Object.entries(ROUTE_MENU).map(([key, value], index) => (
                <div key={key} className="">
                  <LinkEffect
                    href={value.path}
                    onClick={async () => {
                      await new Promise((resolve) => setTimeout(resolve, 300));
                      menuRef.current?.classList.remove('is-open');
                    }}
                  >
                    <HeadingChars isInPopup delayTrigger={delay_trigger._15 + index / 15}>
                      <h2 className="font-title text-80 font-medium uppercase text-txt-dark-primary">
                        {value.name}
                      </h2>
                    </HeadingChars>
                  </LinkEffect>
                </div>
              ))}
            </div>
            <div className="mb-12 flex flex-row gap-2">
              {ROUTE_SOCIAL.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.name}>
                    <Fade delayTrigger={delay_trigger._1 + index / 15} isInPopup from="1.2rem">
                      <div>
                        <Link href={item.path} target="_blank">
                          <BoxCircle
                            className="aspect-square w-12"
                            lerpIn={0.05}
                            lerpOut={0.1}
                            colorCircle="bg-transparent border-bd-dark-soft"
                            scale={0.3}
                          >
                            <div className="flex items-center justify-center rounded-full p-3">
                              <div data-child-inner className="h-6 w-6">
                                <Icon />
                              </div>
                            </div>
                          </BoxCircle>
                        </Link>
                      </div>
                    </Fade>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative col-start-8 -col-end-1 flex flex-col">
          <div className="absolute inset-0 -mr-[var(--size-open-container)]">
            <BoxMaskLeft className="h-full w-full" isInPopup>
              <ImagePlaceholder
                src="/images/menu_img.jpg"
                width={800}
                height={1920}
                alt="logo"
                className="w-full"
              />
            </BoxMaskLeft>
          </div>
          <Fade delayTrigger={delay_trigger._3} isInPopup from="1.2rem">
            <div
              className="absolute -right-8 top-12 mix-blend-difference"
              onClick={() => setIsOpenHeader(false)}
            >
              <BoxCircle
                className="aspect-square w-12"
                lerpIn={0.05}
                lerpOut={0.1}
                colorCircle="bg-transparent border-bd-dark-white"
                scale={0.3}
              >
                <div className="flex items-center justify-center rounded-full p-3">
                  <div data-child-inner className="h-6 w-6">
                    <Close />
                  </div>
                </div>
              </BoxCircle>
            </div>
          </Fade>
          <Fade delayTrigger={delay_trigger._35} isInPopup from="1.6rem">
            <div className="mt-auto w-full px-12 pb-12">
              <ButtonOutline mode="dark" className="w-full uppercase" immutable>
                Order online
              </ButtonOutline>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
