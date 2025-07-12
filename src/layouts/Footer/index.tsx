import './footer.scss';

import BoxCircle from '@/components/BoxCircle';
import ButtonOutline from '@/components/ButtonOutline';
import Facebook from '@/components/Icons/facebook';
import Insta from '@/components/Icons/insta';
import Tiktok from '@/components/Icons/tiktok';
import ImagePreload from '@/components/ImagePreload';
import LinkEffect from '@/components/LinkEffect';
import { ROUTE, ROUTE_SOCIAL } from '@/constants/data-route';
import { delay_trigger } from '@/constants/delay';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import useMouse from '@/hooks/useMouse';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import TextMask, { IHover } from '@/interactive/Hover/TextMask';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import ParagraphLineMask from '@/interactive/Paragraph/Line/Mask';
import { useSignalEffect } from '@preact/signals-react';
import Link from 'next/link';
import { useRef } from 'react';
import ButtonTop from './ButtonTop';
import { SUB_CONTENTS } from '@/constants/infor';

export default function Footer() {
  const refFuns = useRef<IHover>();
  const refMask = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse();
  const { visible } = useIsInViewport({ ref: footerRef });
  useSignalEffect(() => {
    if (!visible.value) return;
    refMask.current?.style.setProperty('--mouse-x', `${mouse.value.x}`);
    refMask.current?.style.setProperty('--mouse-y', `${mouse.value.y}`);
  });
  return (
    <footer className="overflow-hidden bg-bg-sf" ref={footerRef}>
      <div className="grid grid-cols-[0.7833fr_1fr_0.896fr_0.3154fr] !gap-x-0">
        <div className="flex flex-row justify-between">
          <div className="px-10 py-12">
            <div className="flex h-full flex-col justify-between">
              <div
                className="w-[8.526rem] cursor-pointer"
                onMouseEnter={() => {
                  refFuns.current?.onHover?.();
                }}
                onMouseLeave={() => {
                  refFuns.current?.onLeave?.();
                }}
              >
                <TextMask refFuns={refFuns}>
                  <ImagePreload src={'/svgs/logo.svg'} alt={'logo'} width={138} height={24} />
                </TextMask>
              </div>
              <ParagraphLineFade delayTrigger={delay_trigger._05}>
                <div className="text-14 text-txt-dark-secondary">
                  A new gem in Makati that specializes in serving Authentic Vietnamese foods and
                  drinks.
                </div>
              </ParagraphLineFade>
            </div>
          </div>
          <Line color="dark-soft" direction="right" delayTrigger={delay_trigger._1} />
        </div>
        <div className="flex flex-row justify-between">
          <div className="px-10 py-12">
            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-5">
                {Object.entries(ROUTE).map(([key, value], index) => (
                  <LinkEffect href={`/${value}`} key={key}>
                    <ParagraphLineMask delayTrigger={delay_trigger._1 + index / 15}>
                      <div className="py-3.5 text-18 font-normal tracking-36 text-txt-dark-primary">
                        <div className="hover-line">{key}</div>
                      </div>
                    </ParagraphLineMask>
                  </LinkEffect>
                ))}
              </div>
              <div className="flex flex-row gap-2">
                {ROUTE_SOCIAL.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link href={item.path} key={index} target="_blank">
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
                  );
                })}
              </div>
            </div>
          </div>
          <Line color="dark-soft" direction="right" delayTrigger={delay_trigger._1} />
        </div>
        <div className="px-10 py-12">
          <div className="flex flex-col gap-8">
            <HeadingChars delayTrigger={delay_trigger._2}>
              <h2 className="font-title text-56 font-normal text-txt-dark-primary">
                Vietnamese Coffee, banh mi, sticky rice
              </h2>
            </HeadingChars>
            <div className="flex w-full flex-col gap-6">
              {SUB_CONTENTS.map((item, index) => (
                <ItemSubFooter {...item} key={item.label} index={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="py-12 pr-10">
          <div className="flex h-full max-w-full flex-col items-end justify-between">
            <Fade delayTrigger={delay_trigger._2}>
              <div className="w-max">
                <ButtonTop />
              </div>
            </Fade>
            <Fade delayTrigger={delay_trigger._25}>
              <div>
                <ButtonOutline
                  mode="dark"
                  className="whitespace-nowrap !p-4 !text-16 leading-none text-txt-light-white"
                  immutable
                >
                  order online
                </ButtonOutline>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className="grid-cols-1">
        <Line color="dark-soft" direction="bottom" delayTrigger={delay_trigger._1} isCenter />

        <div className="p-[3.25rem]">
          <div className="footer-mask-image relative aspect-[1620/180] w-full">
            <div className="a absolute inset-0 z-10 bg-[url('/images/noise.png')] bg-center bg-repeat"></div>
            <div className="footer-mask-image-gradient" ref={refMask}></div>
          </div>
        </div>
        <Line color="dark-soft" direction="bottom" delayTrigger={delay_trigger._1} isCenter />
      </div>
      <div className="px-10 py-5">
        <div className="flex flex-row justify-between">
          <div className="text-16 text-txt-dark-secondary">© Viet Lasa Coffee Co.</div>
          <div className="flex flex-row gap-3">
            <div className="hover-line text-16 !text-txt-dark-secondary">All rights reserved.</div>
            <LinkEffect href={ROUTE.PRIVACY_POLICY}>
              <div className="hover-line text-16 !text-txt-dark-secondary">Privacy & Terms</div>
            </LinkEffect>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const ItemSubFooter = ({
  label,
  contents,
  index,
  isInPopup,
  isDark,
}: {
  label: string;
  contents: string[];
  index: number;
  isDark?: boolean;
  isInPopup?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <ParagraphLineMask delayTrigger={delay_trigger._1 + index / 15} isInPopup={isInPopup}>
        <div className={`text-14 ${isDark ? 'text-txt-light-tertiary' : 'text-txt-dark-tertiary'}`}>
          {label}
        </div>
      </ParagraphLineMask>
      <div
        className={`flex flex-col gap-2.5 text-14 ${isDark ? 'text-txt-light-secondary' : 'text-txt-dark-secondary'}`}
      >
        {contents.map((content, i) => (
          <div key={i}>
            <Fade
              delayTrigger={index / 15 + i / 15 + delay_trigger._15}
              isInPopup={isInPopup}
              from="1.2rem"
            >
              <div>
                <div
                  className={`hover-line cursor-pointer text-18 font-normal uppercase tracking-36 ${isDark ? '!text-txt-light-primary' : '!text-txt-dark-primary'}`}
                >
                  {content}
                </div>
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};
