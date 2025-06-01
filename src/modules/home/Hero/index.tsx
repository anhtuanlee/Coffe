import ButtonPrimary from '@/components/ButtonPrimary';
import { delay_trigger } from '@/constants/delay';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import React from 'react';

export default function Hero(): React.ReactElement {
  return (
    <section className="w-full bg-bg-primary pb-[23.75rem]">
      <div className="container grid h-screen grid-cols-12">
        <div className="col-start-2 -col-end-2 flex flex-col items-center justify-center gap-8 self-center">
          <HeadingChars delayEnter={0} delayTrigger={0}>
            <h1 className="max-w-[75rem] text-center text-110 font-normal uppercase text-txt-light-primary">
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
      </div>
    </section>
  );
}
