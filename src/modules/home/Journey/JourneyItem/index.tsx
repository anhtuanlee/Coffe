import ButtonArrow from '@/components/ButtonArrow';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ImageParallax from '@/interactive/ImageParallax';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import ParagraphLineMask from '@/interactive/Paragraph/Line/Mask';
import { convertRemToPx, formatDateTime } from '@/utils/uiHelper';
import Image from 'next/image';
import React from 'react';

type TJourneyItem = {
  title: string;
  decs: string;
  createAt: string;
  link: string;
  image: string;
  index: number;
};
export default function JourneyItem(props: TJourneyItem) {
  const { title, decs, createAt, link, image, index } = props;
  const isOdd = index % 2;
  const renderImage = () => {
    const colSpan = !isOdd ? 'col-span-4' : 'col-span-8';
    const width = !isOdd ? 1520 : 500;
    const height = !isOdd ? 1000 : 500;
    return (
      <div className={`${colSpan} relative h-[31.8125rem] overflow-hidden rounded-12`}>
        <Fade delayTrigger={delay_trigger._2} delayEnter={delay_trigger._2}>
          <div className="size-full">
            <BoxMaskLeft
              delayEnter={delay_trigger._25}
              className="size-full overflow-hidden rounded-12"
            >
              <div className="size-full">
                <ImageParallax
                  scale={1.3}
                  speed={isOdd ? 1.3 : -1.3}
                  className="absolute h-full w-full"
                >
                  <Image src={image} width={width} height={height} alt={title} />
                </ImageParallax>
              </div>
            </BoxMaskLeft>
          </div>
        </Fade>
      </div>
    );
  };
  const renderContent = () => {
    const colSpan = !isOdd ? 'col-span-8 pr-16' : 'col-span-4';
    const flexCenter = !isOdd ? 'flex-row [&_div]:flex-1 gap-20' : 'flex-col gap-12';
    const flexBottom = !isOdd
      ? 'flex-1 [&_div]:flex-1 [&>_div]:self-end gap-20'
      : 'flex-row justify-between';
    return (
      <div className={`${colSpan} relative flex flex-col gap-10`}>
        <Line delayTrigger={delay_trigger._05} direction="top" color="dark-second" />
        <div className="flex flex-1 flex-col justify-between">
          <div className={`${flexCenter} flex`}>
            <HeadingChars delayTrigger={delay_trigger._1}>
              <div className="font-title text-24 font-normal text-txt-light-primary">{title}</div>
            </HeadingChars>
            <ParagraphLineFade delayTrigger={delay_trigger._15}>
              <div className="text-16 font-light text-txt-light-secondary">{decs}</div>
            </ParagraphLineFade>
          </div>
          <div className={`${flexBottom} flex`}>
            <ParagraphLineMask delayTrigger={delay_trigger._2}>
              <div className="text-16 font-light text-txt-light-primary">
                {formatDateTime(createAt).dateOnly}
              </div>
            </ParagraphLineMask>
            <Fade delayTrigger={delay_trigger._3} from={convertRemToPx(1.5).toString()}>
              <div>
                <ButtonArrow className="!text-txt-light-primary">
                  <span className="text-16 font-medium text-txt-light-primary">Read more</span>
                </ButtonArrow>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    );
  };

  const handleRenderSuffle = (index: number) => {
    return (
      <>
        {isOdd ? (
          <>
            {renderImage()}
            {renderContent()}
          </>
        ) : (
          <>
            {renderContent()}
            {renderImage()}
          </>
        )}
      </>
    );
  };

  return <div className="grid grid-cols-12">{handleRenderSuffle(index)}</div>;
}
