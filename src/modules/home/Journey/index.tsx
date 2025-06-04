'use client';

import ButtonOutline from '@/components/ButtonOutline';
import HeadingContent from '@/components/HeadingContent';
import React, { useRef } from 'react';
import JourneyItem from './JourneyItem';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import { delay_trigger } from '@/constants/delay';
import Fade from '@/interactive/Fade';

export default function Journey() {
  return (
    <div className="w-full">
      <div className="container grid grid-cols-12 pb-20 pt-[22.5rem]">
        <HeadingContent
          title="the Journal"
          label="Spotlight"
          className="col-start-1 col-end-5"
          type="light"
        />
        <div className="col-start-9 -col-end-1 mb-20 mt-14 flex flex-col gap-5">
          <ParagraphLineFade delayTrigger={delay_trigger._15}>
            <div className="self-end text-right text-16 font-light text-txt-light-secondary">
              Welcome to Viet Lasa Coffee's Journal. Our latest news, coffee musings and sourcing
              stories.
            </div>
          </ParagraphLineFade>
          <Fade delayTrigger={delay_trigger._2}>
            <div className="ml-auto">
              <ButtonOutline className="w-max" mode="light">
                Explore journal
              </ButtonOutline>
            </div>
          </Fade>
        </div>
        <div className="col-span-full flex flex-col gap-20">
          {DATA_JOURNEY.map((item, index) => {
            return <JourneyItem key={item.id} {...item} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
const DATA_JOURNEY = [
  {
    id: 1,
    title: 'Origin: VIETnam.',
    decs: 'Think of spectacular of coffee, and Vietnam is the origin that comes to mind.  With its dramatic landscapes, diverse microclimates, and generations of skilled producers, it’s no surprise that Vietnamese coffee is some of the most sought-after in the world. ',
    createAt: '2025-05-30',
    link: '/',
    image: '/images/journey_1.jpg',
  },
  {
    id: 2,
    title: 'Our Modern Coffee gift guide.',
    decs: 'Celebrate the festive season with gifts that embody warmth, flavour, and craftsmanship. Our curated selection includes premium coffee, artisanal chocolate, and beautifully crafted accessories—ideal for anyone who loves the finer details of life.',
    createAt: '2025-05-30',
    link: '/',
    image: '/images/journey_2.jpg',
  },
  {
    id: 3,
    title: 'Introducing: matcha.',
    decs: 'At Viet Lasa, every ingredient we serve is carefully chosen, not just for what it is, but for how it performs in the cup. Matcha is no exception. We’re introducing matcha at Viet Lasa, treated with the same care and precision as our coffee.',
    createAt: '2025-05-30',
    link: '/',
    image: '/images/journey_3.jpg',
  },
  // {
  //   id: 4,
  //   title: 'Introducing: matcha.',
  //   decs: 'At Viet Lasa, every ingredient we serve is carefully chosen, not just for what it is, but for how it performs in the cup. Matcha is no exception. We’re introducing matcha at Viet Lasa, treated with the same care and precision as our coffee.',
  //   createAt: '2025-05-30',
  //   link: '/',
  //   image: '/images/journey_3.jpg',
  // },
];
