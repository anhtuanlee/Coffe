'use client';
import ButtonPrimary from '@/components/ButtonPrimary';
import ImagePlaceholder from '@/components/ImagePlaceHolder';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ImageParallax from '@/interactive/ImageParallax';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import React, { useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ROOMS = [
  '/images/room_1.jpg',
  '/images/room_2.jpg',
  '/images/room_3.jpg',
  '/images/room_4.jpg',
];
export default function Hero(): React.ReactElement {
  const storyRef = useRef<HTMLDivElement>(null);
  const wrapSlideRef = useRef<HTMLDivElement>(null);

  return (
    <section className="-mb-[21.25rem] w-full bg-bg-primary pt-[4.75rem]">
      <div className="container grid min-h-[72vh] grid-cols-12">
        <div className="col-start-2 -col-end-2 flex flex-col items-center gap-8 self-center py-[min(6.25rem,9vh)]">
          <HeadingChars delayEnter={0} delayTrigger={0}>
            <h1 className="max-w-[60rem] text-center font-title text-110 font-normal uppercase text-txt-light-primary">
              Shaping Vietnamese coffee culture
            </h1>
          </HeadingChars>
          <ParagraphLineFade delayEnter={delay_trigger._1} delayTrigger={delay_trigger._1}>
            <div className="max-w-[48.5rem] text-center text-16 font-light text-txt-light-secondary">
              Experience the rich flavors of traditional Vietnamese coffee, banh mi, and savory
              sticky rice in the heart of Makati. We believe in preserving traditional Vietnamese
              brewing methods and recipes while creating a warm, welcoming space for our customers
              to enjoy a genuine experience.
            </div>
          </ParagraphLineFade>
          <Fade delayEnter={delay_trigger._15} delayTrigger={delay_trigger._15}>
            <div>
              <ButtonPrimary className="min-w-[3.75rem]">
                <span className="text-txt-light-white">Explore our menu</span>
              </ButtonPrimary>
            </div>
          </Fade>
        </div>

        <div className="z-20 col-start-2 -col-end-2 w-full">
          <Fade delayTrigger={delay_trigger._1} delayEnter={delay_trigger._1}>
            <div className="overflow-hidden rounded-12">
              <BoxMaskLeft delayTrigger={delay_trigger._15} delayEnter={delay_trigger._15}>
                <div
                  className="col-start-2 -col-end-2 aspect-[1304/680] h-full w-full overflow-hidden rounded-12"
                  ref={wrapSlideRef}
                >
                  <Swiper
                    loop
                    slidesPerView={1}
                    modules={[Pagination, Autoplay]}
                    speed={1200}
                    parallax={{
                      enabled: true,
                    }}
                    autoplay={{
                      delay: 5000,
                    }}
                    pagination={{
                      clickable: true,
                      bulletClass: 'pagi-custom',
                      bulletActiveClass: 'pagi-custom-active',
                    }}
                    className="relative h-full [&>.swiper-pagination]:!bottom-[3.5rem] [&>.swiper-pagination]:!left-1/2 [&>.swiper-pagination]:z-20 [&>.swiper-pagination]:flex [&>.swiper-pagination]:w-auto [&>.swiper-pagination]:-translate-x-1/2 [&>.swiper-pagination]:flex-row [&>.swiper-pagination]:items-center [&>.swiper-pagination]:justify-center [&>.swiper-pagination]:gap-2"
                  >
                    {ROOMS.map((item, key) => {
                      return (
                        <SwiperSlide key={key} className="w-full">
                          <div className="h-full w-full">
                            <ImageParallax>
                              <ImagePlaceholder src={item} alt="story" width={1920} height={1000} />
                            </ImageParallax>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </BoxMaskLeft>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
