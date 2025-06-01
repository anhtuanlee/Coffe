import ImagePlaceholder from '@/components/ImagePlaceHolder';
import ImagePreload from '@/components/ImagePreload';
import { delay_trigger } from '@/constants/delay';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ParagraphLineMask from '@/interactive/Paragraph/Line/Mask';
import React from 'react';

export default function Instagram() {
  const IMAGE_INSTA = [
    {
      id: 6,
      image: '/images/insta_3.jpg',
    },
    {
      id: 1,
      image: '/images/insta_1.jpg',
    },
    {
      id: 2,
      image: '/images/insta_2.jpg',
    },
    {
      id: 3,
      image: '/images/insta_3.jpg',
    },
    {
      id: 4,
      image: '/images/insta_4.jpg',
    },
    {
      id: 5,
      image: '/images/insta_3.jpg',
    },
  ];
  return (
    <div className="bg-bg-light pt-10">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-3">
          <ParagraphLineMask delayTrigger={delay_trigger._05}>
            <div className="text-20 font-light uppercase text-txt-light-primary">
              Follow Our Journey
            </div>
          </ParagraphLineMask>
          <HeadingChars delayTrigger={delay_trigger._1}>
            <h2 className="uppercas font-title text-56 font-medium text-txt-light-primary">
              @vietlasa
            </h2>
          </HeadingChars>
        </div>
        <div className="w-full">
          <div className="flex w-full flex-row justify-center overflow-hidden">
            {IMAGE_INSTA.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex h-[30rem] flex-shrink-0 basis-[20rem] cursor-pointer select-none items-center justify-center overflow-hidden transition-all duration-500 hover:basis-[30rem]"
              >
                <Fade delayTrigger={index / 10} direction="none">
                  <div className="aspect-square h-full">
                    <ImagePlaceholder
                      height={480}
                      width={480}
                      src={item.image}
                      alt={`insta-${item.id}`}
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ImagePreload width={50} height={50} src={'/svgs/insta.svg'} alt={'insta'} />
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
