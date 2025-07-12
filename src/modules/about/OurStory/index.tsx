import HeadingContent from '@/components/HeadingContent';
import ImagePlaceholder from '@/components/ImagePlaceHolder';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import ImageParallax from '@/interactive/ImageParallax';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import React from 'react';

const OurStory = () => {
  return (
    <div className="bg-bg-dark pb-[7.5rem] pt-[6.25rem]">
      <div className="container grid grid-cols-12">
        <HeadingContent
          className="col-start-3 -col-end-3 mx-auto mb-12 max-w-[67rem] text-center"
          title="Catch up with friends over Vietnamese coffee, yummy banh mi, and days you’ll never want to end at Vietlasa"
          type="dark"
          label="Our Story"
        />
        <div className="col-start-1 col-end-4 mt-16">
          <div className="flex max-w-[28.25rem] flex-col gap-12">
            <BoxMaskLeft
              className="h-full w-full overflow-hidden rounded-12"
              delayTrigger={delay_trigger._15}
            >
              <div>
                <ImageParallax>
                  <ImagePlaceholder
                    src="/images/about_story_1.jpg"
                    alt="our story"
                    width={900}
                    height={900}
                    className="aspect-[452/427] h-auto w-full rounded-12"
                  />
                </ImageParallax>
              </div>
            </BoxMaskLeft>
            <ParagraphLineFade delayTrigger={delay_trigger._2}>
              <div className="max-w-[26rem] text-16 font-normal text-txt-dark-secondary">
                Step into a cozy haven where warm wood, lush greens, and soft lighting create a
                relaxing escape. Our Manila space reflects Vietnam’s charm, offering a perfect spot
                for friends, families, or a quiet coffee moment, right in the heart of the city.
              </div>
            </ParagraphLineFade>
          </div>
        </div>
        <div className="col-start-5 -col-end-5">
          <div className="flex flex-col">
            <div className="mx-auto mb-6 h-[14.75rem]">
              <Line delayTrigger={delay_trigger._2} direction="left" color="dark-strong" />
            </div>
            <ParagraphLineFade delayTrigger={delay_trigger._25}>
              <div className="mx-auto mb-6 max-w-[23rem] text-center text-16 text-txt-dark-secondary">
                Viet Lasa Coffee began with a heartfelt desire to share Vietnam’s vibrant coffee and
                food culture with Manila. From a simple dream, it’s grown into a cherished spot
                blending authentic flavors with modern charm.
              </div>
            </ParagraphLineFade>
            <div className="mx-auto -mb-[7.5rem] h-auto min-h-[30.5625rem] pb-2">
              <Line
                delayTrigger={delay_trigger._3}
                direction="left"
                classNames=" min-h-[30.5625rem]"
                color="dark-strong"
              />
            </div>
          </div>
        </div>
        <div className="col-start-9 -col-end-1 ml-auto mt-16 max-w-[28.25rem]">
          <BoxMaskLeft
            className="aspect-[452/715] h-full w-full overflow-hidden rounded-12"
            delayTrigger={delay_trigger._35}
          >
            <div className="h-full w-full">
              <ImageParallax>
                <ImagePlaceholder
                  src="/images/about_story_2.jpg"
                  alt="our story"
                  width={900}
                  height={1400}
                  className="h-auto w-full rounded-12"
                />
              </ImageParallax>
            </div>
          </BoxMaskLeft>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
