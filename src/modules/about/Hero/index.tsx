import BoxCircle from '@/components/BoxCircle';
import ImagePlaceholder from '@/components/ImagePlaceHolder';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ImageParallax from '@/interactive/ImageParallax';
import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 z-10">
        <BoxMaskLeft className="h-full w-full overflow-hidden">
          <div>
            <ImageParallax>
              <ImagePlaceholder
                src={'/images/about_hero.jpg'}
                alt="hero"
                width={2560}
                height={1440}
              />
            </ImageParallax>
          </div>
        </BoxMaskLeft>
      </div>
      <div className="absolute bottom-12 z-20">
        <div className="container grid grid-cols-16">
          <HeadingChars delayTrigger={delay_trigger._1}>
            <h1 className="col-span-10 col-start-1 justify-end self-end pb-12 font-title text-100 font-semibold uppercase text-txt-light-white">
              Discover Authentic Vietnamese Coffee & Bites in Manila
            </h1>
          </HeadingChars>
          <div className="-col-end-1 -mr-8 flex flex-row justify-end gap-2 self-end">
            <Fade delayTrigger={delay_trigger._25} direction="none">
              <div>
                <BoxCircle
                  className="aspect-square h-auto w-[12.5rem]"
                  lerpIn={0.05}
                  lerpOut={0.1}
                  scale={1.2}
                  colorCircle="bg-bg-light transition-all duration-500 border-txt-light-primary"
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center font-title text-24 font-normal uppercase text-txt-light-primary">
                      get map
                    </div>
                  </div>
                </BoxCircle>
              </div>
            </Fade>
            <Fade delayTrigger={delay_trigger._3} direction="none">
              <div className="-translate-x-8">
                <BoxCircle
                  lerpOut={0.05}
                  scale={1.2}
                  className="aspect-square h-auto w-[12.5rem]"
                  colorCircle="bg-bg-light transition-all duration-500 border-txt-light-primary"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full">
                    <div className="text-center font-title text-24 font-normal uppercase text-txt-light-primary">
                      order online
                    </div>
                  </div>
                </BoxCircle>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}
