import React from 'react';
import Hero from './Hero';
import Story from './Story';
import OurMenu from './OurMenu';
import Taste from './Taste';
import Journey from './Journey';
import Instagram from './Instagram';
import ProviderTheme from '@/store/ThemeProvider';
import SectionBgChange from '@/components/SectionBgChange';
const HomeModule = () => {
  return (
    <div className="flex flex-col">
      <ProviderTheme>
        <Hero />
        <SectionBgChange>
          <Story />
          <OurMenu />
          <Taste />
          <Journey />
        </SectionBgChange>
        <Instagram />
      </ProviderTheme>
    </div>
  );
};

export default HomeModule;
