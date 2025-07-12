import BoxCircle from '@/components/BoxCircle';
import Insta from '@/components/Icons/insta';
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
      image: '/images/insta_5.jpg',
    },
  ];
  return (
    <div className="bg-bg-light pt-10">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-3">
          <ParagraphLineMask delayTrigger={delay_trigger._05}>
            <div className="text-20 uppercase text-txt-light-primary">Follow Our Journey</div>
          </ParagraphLineMask>
          <HeadingChars delayTrigger={delay_trigger._1}>
            <h2 className="uppercas hover-line size-line-3 font-title text-56 font-semibold !text-txt-light-primary">
              @vietlasa
            </h2>
          </HeadingChars>
        </div>
        <div className="w-full">
          <div className="flex w-full flex-row justify-center overflow-hidden">
            {IMAGE_INSTA.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex aspect-square h-[28vw] w-[calc(100vw_/_5)] cursor-pointer select-none items-center justify-center overflow-hidden transition-all duration-500 hover:w-[28vw] hover:flex-shrink-0"
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
                      <BoxCircle
                        className="aspect-square w-12"
                        lerpIn={0.05}
                        lerpOut={0.1}
                        colorCircle="bg-transparent border-light-primary"
                        scale={0.3}
                      >
                        <div className="flex items-center justify-center rounded-full p-3">
                          <div data-child-inner className="h-6 w-6">
                            <Insta />
                          </div>
                        </div>
                      </BoxCircle>
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
