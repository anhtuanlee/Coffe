'use client';

import BoxCircle from '@/components/BoxCircle';
import ImagePlaceholder from '@/components/ImagePlaceHolder';
import useColorChange from '@/components/SectionBgChange/useColorChange';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ImageParallax from '@/interactive/ImageParallax';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import ParagraphLineMask from '@/interactive/Paragraph/Line/Mask';
import { useRef } from 'react';

export default function Taste() {
  return (
    <div className="relative flex flex-col">
      <div className="relative aspect-[1728/745] w-full">
        <div className="absolute left-1/2 top-16 z-20 flex -translate-x-1/2 flex-col items-center">
          <HeadingChars delayTrigger={delay_trigger._05}>
            <h2 className="font-title text-90 font-normal uppercase text-[#F7F4F0]">viet lasa</h2>
          </HeadingChars>
          <ParagraphLineFade delayTrigger={delay_trigger._1}>
            <div className="text-20 tracking-[5%] text-[#F7F4F0]">Vietnamese Food & Drinks </div>
          </ParagraphLineFade>
        </div>
        <BoxMaskLeft delayEnter={delay_trigger._15}>
          <div>
            <ImageParallax>
              <div>
                <ImagePlaceholder src="/images/taste.jpg" width={1728} height={745} alt="taste" />
              </div>
            </ImageParallax>
          </div>
        </BoxMaskLeft>
      </div>
      <div className="container absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
        <div className="grid w-full grid-cols-12 rounded-12 bg-bg-dark transition-all duration-500">
          <div className="col-start-1 col-end-6 flex flex-col py-16 pl-16">
            <HeadingChars delayTrigger={delay_trigger._05}>
              <h2 className="mb-10 font-title text-64 font-normal text-txt-dark-primary">
                A Taste of Vietnam in Makati!
              </h2>
            </HeadingChars>
            <ParagraphLineFade delayTrigger={delay_trigger._1}>
              <div className="mb-[3.75rem] text-16 text-txt-dark-label">
                Craving authentic Vietnamese flavors? Vietlasa has it all—crispy Bánh Mì, flavorful
                Sticky Rice, and bold Vietnamese Coffee! Plus, their art toy collection makes the
                place even more fun and unique!
              </div>
            </ParagraphLineFade>
            <div className="my-3.5 flex flex-row gap-8">
              <ParagraphLineMask delayTrigger={delay_trigger._15} delayEnter={delay_trigger._15}>
                <div className="whitespace-nowrap text-18 font-normal uppercase tracking-36 text-txt-dark-primary">
                  1085 Chino Roces, Makati
                </div>
              </ParagraphLineMask>
              <Line delayTrigger={delay_trigger._15} direction="left" color="white" />
              <ParagraphLineMask delayTrigger={delay_trigger._2} delayEnter={delay_trigger._2}>
                <div className="whitespace-nowrap text-18 font-normal uppercase tracking-36 text-txt-dark-primary">
                  everyday 10:30am Til 8:00pm
                </div>
              </ParagraphLineMask>
            </div>
          </div>
          <div className="col-start-8 -col-end-2 self-center justify-self-end">
            <div className="flex flex-row">
              <Fade delayTrigger={delay_trigger._25} direction="none">
                <div>
                  <BoxCircle
                    className="aspect-square w-60"
                    lerpIn={0.05}
                    lerpOut={0.1}
                    scale={1.2}
                    colorCircle="bg-bg-dark transition-all duration-500"
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-center font-title text-32 font-normal uppercase text-txt-light-white">
                        Menu
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
                    className="aspect-square w-60"
                    colorCircle="bg-bg-dark"
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full">
                      <div className="text-center font-title text-32 font-normal uppercase text-txt-light-white">
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
    </div>
  );
}
