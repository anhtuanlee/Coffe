import { useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import { MutableRefObject } from 'react';

import { currentTheme } from '@/stores/useThemeSignal';

export default function useColorChange(
  ref: MutableRefObject<HTMLDivElement | HTMLElement | null>
): void {
  useSignalEffect(() => {
    if (!ref.current || !document) return;

    if (currentTheme.value === 'light') {
      const be = gsap.getProperty(document.documentElement, '--be');
      const blackGrey = gsap.getProperty(document.documentElement, '--black-grey');
      const blackMatter = gsap.getProperty(document.documentElement, '--black-matter');
      const white = gsap.getProperty(document.documentElement, '--white');
      const silver = gsap.getProperty(document.documentElement, '--silver');

      ref.current.style.setProperty('--black-grey', be.toString());
      ref.current.style.setProperty('--white', blackGrey.toString());
      ref.current.style.setProperty('--light-grey', blackMatter.toString());
      ref.current.style.setProperty('--silver-2', silver.toString());
      ref.current.style.setProperty('--black', white.toString());
      ref.current.style.setProperty('--light-grey-3', blackMatter.toString());
      ref.current.style.setProperty('--black-matter', silver.toString());
    } else {
      ref.current.style.removeProperty('--black-grey');
      ref.current.style.removeProperty('--white');
      ref.current.style.removeProperty('--light-grey');
      ref.current.style.removeProperty('--silver-2');
      ref.current.style.removeProperty('--black');
      ref.current.style.removeProperty('--light-grey-3');
      ref.current.style.removeProperty('--black-matter');
    }
  });
}
