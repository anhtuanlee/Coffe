import HeadingContent from '@/components/HeadingContent';
import ImagePlaceholder from '@/components/ImagePlaceHolder';
import ImagePreload from '@/components/ImagePreload';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import Fade from '@/interactive/Fade';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import React from 'react';

export default function Founder() {
  return (
    <div className="bg-bg-light">
      <div className="container grid grid-cols-12">
        <div className="col-start-1 col-end-7 flex flex-col pt-16">
          <div className="flex h-full w-[35rem] flex-col items-center justify-between self-center">
            <HeadingContent title="Meet the Founder" type="light" />
            <ParagraphLineFade delayTrigger={delay_trigger._1}>
              <div className="text-center text-16 text-txt-light-secondary">
                Story of how Vietlasa was founded, the inspiration behind bringing Vietnamese coffee
                culture to Makati, and the passion for authentic flavors and traditions. Vietlasa
                has it all—crispy Bánh Mì, flavorful Sticky Rice, and bold Vietnamese Coffee! Plus,
                their art toy collection makes the place even more fun and unique!
              </div>
            </ParagraphLineFade>
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-row items-center">
                <Fade delayTrigger={delay_trigger._15}>
                  <div>
                    <div className="aspect-square w-16">
                      <ImagePreload
                        src="/images/founder_2.png"
                        alt="Founder"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                </Fade>
                <Fade delayTrigger={delay_trigger._2}>
                  <div className="-ml-4 aspect-square w-16">
                    <ImagePreload
                      src="/images/founder_1.png"
                      alt="Founder"
                      width={200}
                      height={200}
                    />
                  </div>
                </Fade>
              </div>
              <ParagraphLineFade delayTrigger={delay_trigger._25}>
                <div className="text-center text-16 text-txt-light-secondary">
                  Troy, from Ho Chi Minh City, and Henry, from Hanoi, infuse their love for
                  Vietnamese coffee and food into every detail.
                </div>
              </ParagraphLineFade>
            </div>
          </div>
          <div className="-ml-[var(--padding-container)] -mr-[var(--gap-x)] mt-16 min-w-full">
            <Line delayTrigger={delay_trigger._3} direction="top" />
          </div>
        </div>
        <div className="col-start-7 -col-end-1 -mr-[var(--padding-container)]">
          <ImagePlaceholder src="/images/founder_bg.jpg" width={1000} height={1000} alt="Founder" />
        </div>
      </div>
    </div>
  );
}
