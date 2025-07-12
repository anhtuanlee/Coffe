'use client';

import BoxCircle from '@/components/BoxCircle';
import { ROUTE_SOCIAL } from '@/constants/data-route';
import { delay_trigger } from '@/constants/delay';
import { SUB_CONTENTS } from '@/constants/infor';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import { ItemSubFooter } from '@/layouts/Footer';
import Link from 'next/link';
import FormContact from './Form';

export default function ContactModule() {
  return (
    <div className="min-h-screen bg-bg-light py-[6.25rem]">
      <div className="container relative mt-[4.75rem] grid grid-cols-12">
        <div className="col-start-1 col-end-6 flex flex-col gap-40">
          <div className="flex flex-col">
            <HeadingChars delayTrigger={delay_trigger._05} duration={0.8}>
              <div className={`font-body text-16 uppercase text-txt-light-secondary`}>
                Contact us
              </div>
            </HeadingChars>
            <HeadingChars delayEnter={delay_trigger._1} delayTrigger={delay_trigger._15}>
              <div
                className={`mb-5 font-title text-100 font-semibold uppercase text-txt-light-primary`}
              >
                Lets connect!
              </div>
            </HeadingChars>
            <ParagraphLineFade>
              <div className="max-w-[32.875rem] font-body text-16 text-txt-light-secondary">
                If you want to come in contact with us regarding specific matters please don’t
                hesitate to write a message to us, reach out on Instagram or give us a call.
              </div>
            </ParagraphLineFade>
          </div>
          <div className="flex w-full flex-col gap-6">
            {SUB_CONTENTS.map((item, index) => (
              <ItemSubFooter {...item} key={item.label} index={index} isDark={true} />
            ))}
            <div className="flex flex-row items-center gap-2">
              {ROUTE_SOCIAL.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Fade
                    delayTrigger={delay_trigger._1 + index / 15}
                    duration={0.8}
                    key={index}
                    from="1.2rem"
                    delayEnter={0.1 + index / 15}
                  >
                    <div>
                      <Link href={item.path} target="_blank">
                        <BoxCircle
                          className="aspect-square w-12"
                          lerpIn={0.025}
                          lerpOut={0.1}
                          colorCircle="bg-transparent border-bd-light-soft"
                          scale={0.3}
                        >
                          <div className="flex items-center justify-center rounded-full p-3">
                            <div data-child-inner className="h-6 w-6">
                              <Icon isDark={true} />
                            </div>
                          </div>
                        </BoxCircle>
                      </Link>
                    </div>
                  </Fade>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sticky top-0 col-start-7 col-end-13">
          <div className="rounded-12 bg-bg-primary px-12 pb-12 pt-10">
            <div className="flex flex-col">
              <h2 className="text-center font-title text-32 font-medium text-txt-light-primary">
                Send us a message
              </h2>
              <FormContact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
