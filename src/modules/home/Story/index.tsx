'use client';

import ButtonOutline from '@/components/ButtonOutline';
import HeadingContent from '@/components/HeadingContent';
import ImagePlaceholder from '@/components/ImagePlaceHolder';
import useColorChange from '@/components/SectionBgChange/useColorChange';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ImageParallax from '@/interactive/ImageParallax';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import React, { useRef } from 'react';

export default function Story(): React.ReactElement {
  const storyWrapperRef = useRef<HTMLDivElement>(null);

  useColorChange(storyWrapperRef);

  return (
    <section className="relative" data-theme="dark" ref={storyWrapperRef}>
      <div className="container grid grid-cols-12">
        <div className="col-span-full grid grid-cols-12 pb-[7.5rem] pt-[29.75rem]">
          <HeadingContent
            className="col-start-3 -col-end-3 mx-auto mb-20 text-center"
            label="Our Story"
            title="Vietlasa Coffee brings the authentic taste of Vietnam to Makati"
          />
          <div className="col-start-1 col-end-5">
            <Fade delayTrigger={delay_trigger._05} delayEnter={delay_trigger._1}>
              <div className="aspect-[495/865] overflow-hidden rounded-12">
                <BoxMaskLeft className="overflow-hidden rounded-12">
                  <div>
                    <ImageParallax>
                      <ImagePlaceholder
                        src="/images/about_1.jpg"
                        alt="story"
                        width={1000}
                        height={1600}
                      />
                    </ImageParallax>
                  </div>
                </BoxMaskLeft>
              </div>
            </Fade>
          </div>
          <div className="col-start-5 col-end-9 flex flex-col justify-between">
            <div className="flex w-[calc(376/510*100%)] flex-col">
              <Fade delayTrigger={delay_trigger._1}>
                <div className="mb-8 aspect-[376/454] overflow-hidden rounded-12">
                  <BoxMaskLeft
                    className="overflow-hidden rounded-12"
                    delayTrigger={delay_trigger._15}
                  >
                    <div>
                      <ImageParallax speed={-1}>
                        <ImagePlaceholder
                          src="/images/about_2.jpg"
                          alt="story"
                          width={1000}
                          height={1600}
                        />
                      </ImageParallax>
                    </div>
                  </BoxMaskLeft>
                </div>
              </Fade>

              <ParagraphLineFade>
                <div className="text-16 text-txt-dark-secondary">
                  Viet Lasa is a new Vietnamese cafe in Makati that has a warm, nature-inspired vibe
                  with unique wall art and wood tones. It’s also a great spot for studying and
                  working!
                </div>
              </ParagraphLineFade>
            </div>
            <HeadingChars delayTrigger={delay_trigger._1}>
              <h2 className="font-title text-36 font-normal text-txt-dark-primary">
                Catch up with friends over Vietnamese coffee, yummy banh mi, and days you’ll never
                want to end at Vietlasa!
              </h2>
            </HeadingChars>
          </div>
          <div className="col-span-3 -col-end-1 flex flex-row gap-8">
            <Line duration={1.2} direction="left" color="dark-strong" />
            <div className="flex flex-col">
              <ParagraphLineFade>
                <div className="mb-8 text-16 text-txt-dark-secondary">
                  Story of how Vietlasa was founded, the inspiration behind bringing Vietnamese
                  coffee culture to Makati, and the passion for authentic flavors and traditions.
                  Vietlasa has it all—crispy Bánh Mì, flavorful Sticky Rice, and bold Vietnamese
                  Coffee! Plus, their art toy collection makes the place even more fun and unique!
                </div>
              </ParagraphLineFade>
              <Fade delayTrigger={delay_trigger._15}>
                <div>
                  <ButtonOutline mode="dark" className="w-full" immutable>
                    <span className="text-16">More about us</span>
                  </ButtonOutline>
                </div>
              </Fade>
              <Fade delayTrigger={delay_trigger._2}>
                <div className="mt-auto aspect-[345/440] overflow-hidden rounded-12">
                  <BoxMaskLeft
                    className="overflow-hidden rounded-12"
                    delayTrigger={delay_trigger._25}
                  >
                    <div>
                      <ImageParallax speed={1.2}>
                        <ImagePlaceholder
                          src="/images/about_3.jpg"
                          alt="story"
                          width={700}
                          height={880}
                        />
                      </ImageParallax>
                    </div>
                  </BoxMaskLeft>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
