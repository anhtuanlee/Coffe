import IconCaffe from '@/components/Icons/caffe';
import { SlideV2 } from '@/components/Slide';
import React from 'react';

export default function Marquee() {
  return (
    <div className="bg-bg-light py-[6.5625rem]">
      <div className="flex flex-col">
        <SlideV2 direction={1} velocity={1} key={'slide-1'} length={2}>
          <div className="flex flex-row items-center gap-4 pr-4">
            <h2 className="font-title text-80 font-semibold text-txt-light-primary">
              shaping Vietnamese coffee culture
            </h2>
            <div className="mt-[0.3em] h-16 w-16">
              <IconCaffe />
            </div>
          </div>
        </SlideV2>
        <SlideV2 direction={-1} velocity={1} key={'slide-2'} length={2}>
          <div className="flex flex-row items-center gap-4 pr-4">
            <h2 className="font-title text-80 font-semibold text-txt-light-primary">
              shaping Vietnamese coffee culture
            </h2>
            <div className="mt-[0.3em] h-16 w-16">
              <IconCaffe />
            </div>
          </div>
        </SlideV2>
      </div>
    </div>
  );
}
