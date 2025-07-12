'use client';

import Instagram from '../home/Instagram';
import Founder from './Founder';
import Hero from './Hero';
import Marquee from './Marquee';
import OurStory from './OurStory';
import Savor from './Savor';

export default function AboutModule() {
  return (
    <div className="h-auto w-full">
      <Hero />
      <OurStory />
      <Savor />
      <Founder />
      <Marquee />
      <Instagram />
    </div>
  );
}
