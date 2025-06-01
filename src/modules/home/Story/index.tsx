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
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ROOMS = [
  '/images/room_1.jpg',
  '/images/room_2.jpg',
  '/images/room_3.jpg',
  '/images/room_4.jpg',
];
export default function Story(): React.ReactElement {
  const storyRef = useRef<HTMLDivElement>(null);
  const storyWrapperRef = useRef<HTMLDivElement>(null);
  const wrapSlideRef = useRef<HTMLDivElement>(null);

  useColorChange(storyWrapperRef);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();
    gsap.set(wrapSlideRef.current, {
      scale: 0.9,
    });
    ScrollTrigger.create({
      trigger: storyRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: tl,
    });

    tl.to(wrapSlideRef.current, {
      scale: 1,
    });
    tl.to(wrapSlideRef.current, {
      scale: 0.9,
    });
  });
  return (
    <section className="relative" data-theme="dark" ref={storyWrapperRef}>
      <div className="absolute top-0 w-full -translate-y-1/2" ref={storyRef}>
        <div className="relative" ref={wrapSlideRef}>
          <Swiper
            loop
            slidesPerView={1}
            modules={[Pagination, Autoplay]}
            speed={1600}
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
            className="relative [&>.swiper-pagination]:!bottom-[3.5rem] [&>.swiper-pagination]:!left-1/2 [&>.swiper-pagination]:flex [&>.swiper-pagination]:w-auto [&>.swiper-pagination]:-translate-x-1/2 [&>.swiper-pagination]:flex-row [&>.swiper-pagination]:items-center [&>.swiper-pagination]:justify-center [&>.swiper-pagination]:gap-2"
          >
            {ROOMS.map((item, key) => {
              return (
                <SwiperSlide key={key} className="w-full">
                  <div className="container aspect-[1568/745] h-full w-full">
                    <div className="h-full w-full overflow-hidden rounded-12">
                      <ImageParallax>
                        <ImagePlaceholder src={item} alt="story" width={1920} height={1000} />
                      </ImageParallax>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="container grid grid-cols-12">
        <div className="col-span-full grid grid-cols-12 pb-[7.5rem] pt-[30.65rem]">
          <HeadingContent
            className="col-start-3 -col-end-3 mx-auto mb-20 text-center"
            label="Our Story"
            title="Vietlasa Coffee brings the authentic taste of Vietnam to Makati"
          />
          <div className="col-start-1 col-end-5">
            <div className="aspect-[495/865] overflow-hidden rounded-12">
              <BoxMaskLeft className="overflow-hidden rounded-12">
                <div>
                  <ImageParallax>
                    <ImagePlaceholder
                      src="/images/story_1.jpg"
                      alt="story"
                      width={1000}
                      height={1600}
                    />
                  </ImageParallax>
                </div>
              </BoxMaskLeft>
            </div>
          </div>
          <div className="col-start-5 col-end-9 flex flex-col justify-between">
            <div className="flex w-[calc(376/510*100%)] flex-col">
              <div className="mb-8 aspect-[376/454] overflow-hidden rounded-12">
                <BoxMaskLeft className="overflow-hidden rounded-12">
                  <div>
                    <ImageParallax speed={-1}>
                      <ImagePlaceholder
                        src="/images/story_2.jpg"
                        alt="story"
                        width={1000}
                        height={1600}
                      />
                    </ImageParallax>
                  </div>
                </BoxMaskLeft>
              </div>

              <ParagraphLineFade>
                <div className="text-16 font-light text-txt-dark-secondary">
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
                <div className="mb-8 text-16 font-light text-txt-dark-secondary">
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
              <div className="mt-auto aspect-[345/440] overflow-hidden rounded-12">
                <BoxMaskLeft className="overflow-hidden rounded-12">
                  <div>
                    <ImageParallax speed={1.2}>
                      <ImagePlaceholder
                        src="/images/story_3.jpg"
                        alt="story"
                        width={700}
                        height={880}
                      />
                    </ImageParallax>
                  </div>
                </BoxMaskLeft>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
