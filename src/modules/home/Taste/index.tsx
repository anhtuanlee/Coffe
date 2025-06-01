'use client';

import ImagePlaceholder from '@/components/ImagePlaceHolder';
import useColorChange from '@/components/SectionBgChange/useColorChange';
import { delay_trigger } from '@/constants/delay';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ImageParallax from '@/interactive/ImageParallax';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import ParagraphLineMask from '@/interactive/Paragraph/Line/Mask';
import { useRef } from 'react';

export default function Taste() {
  const tasteRef = useRef<HTMLDivElement>(null);
  useColorChange(tasteRef);
  return (
    <div
      className="relative flex flex-col"
      data-theme="dark"
      ref={tasteRef}
      data-position-end="top top"
      data-position-start="bottom center"
    >
      <div className="aspect-[1728/745] w-full">
        <ImageParallax>
          <div>
            <ImagePlaceholder src="/images/taste.jpg" width={1728} height={745} alt="taste" />
          </div>
        </ImageParallax>
      </div>
      <div className="container absolute bottom-0 z-10 translate-y-1/2">
        <div className="grid w-full grid-cols-12 rounded-12 bg-bg-dark">
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
            <div className="flex flex-row gap-4">
              <Fade delayTrigger={delay_trigger._25} direction="none">
                <div className="flex aspect-square w-60 items-center justify-center rounded-full border border-solid border-txt-dark-secondary bg-bg-dark">
                  <div className="text-center font-title text-32 font-normal uppercase text-txt-light-white">
                    Menu
                  </div>
                </div>
              </Fade>
              <Fade delayTrigger={delay_trigger._3} direction="none">
                <div className="-mx-8 flex aspect-square w-60 items-center justify-center rounded-full border border-solid border-txt-dark-secondary bg-bg-dark">
                  <div className="text-center font-title text-32 font-normal uppercase text-txt-light-white">
                    order online
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
