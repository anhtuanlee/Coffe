import { useTheme } from '@/store/ThemeProvider';
import { useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import { MutableRefObject } from 'react';

export default function useColorChange(
  ref: MutableRefObject<HTMLDivElement | HTMLElement | null>
): void {
  const { currentTheme } = useTheme();
  useSignalEffect(() => {
    if (!ref.current || !document) return;
    const bgLight = gsap.getProperty(document.documentElement, '--bg-light');
    const bgDark = gsap.getProperty(document.documentElement, '--bg-dark');
    const textLightPrimary = gsap.getProperty(document.documentElement, '--text-light-primary');
    const textLightWhite = gsap.getProperty(document.documentElement, '--text-light-white');
    const textDarkWhite = gsap.getProperty(document.documentElement, '--text-dark-white');
    const textDarkPrimary = gsap.getProperty(document.documentElement, '--text-dark-primary');

    const textLightSecondary = gsap.getProperty(document.documentElement, '--text-light-secondary');
    const textDarkSecondary = gsap.getProperty(document.documentElement, '--text-dark-secondary');

    const textLightLabel = gsap.getProperty(document.documentElement, '--text-light-label');
    const textDarkLabel = gsap.getProperty(document.documentElement, '--text-dark-label');

    const textLightTertiary = gsap.getProperty(document.documentElement, '--text-light-tertiary');
    const textDarkTertiary = gsap.getProperty(document.documentElement, '--text-dark-tertiary');

    if (currentTheme.value === 'light') {
      ref.current.style.setProperty('--bg-light', bgDark.toString());
      ref.current.style.setProperty('--bg-dark', bgLight.toString());
      ref.current.style.setProperty('--text-light-primary', textDarkPrimary.toString());
      ref.current.style.setProperty('--text-dark-primary', textLightPrimary.toString());
      ref.current.style.setProperty('--text-dark-label', textLightLabel.toString());
      ref.current.style.setProperty('--text-dark-secondary', textLightSecondary.toString());
      ref.current.style.setProperty('--text-light-tertiary', textDarkTertiary.toString());
      ref.current.style.setProperty('--text-light-white', textDarkWhite.toString());

      ref.current.style.removeProperty('--text-light-label');
      ref.current.style.removeProperty('--text-light-secondary');
      ref.current.style.removeProperty('--text-light-tertiary');
      ref.current.style.removeProperty('--text-light-primary');
      // ref.current.style.removeProperty('--bg-dark');
      ref.current.style.removeProperty('--text-dark-white');
    } else {
      ref.current.style.setProperty('--bg-dark', bgLight.toString());
      ref.current.style.setProperty('--bg-light', bgDark.toString());
      ref.current.style.setProperty('--text-light-primary', textDarkPrimary.toString());
      ref.current.style.setProperty('--text-light-label', textDarkLabel.toString());
      ref.current.style.setProperty('--text-light-secondary', textDarkSecondary.toString());
      ref.current.style.setProperty('--text-dark-tertiary', textLightTertiary.toString());
      ref.current.style.removeProperty('--bg-light');
      ref.current.style.removeProperty('--bg-dark');
      ref.current.style.removeProperty('--text-light-white');

      ref.current.style.removeProperty('--text-dark-primary');
      ref.current.style.removeProperty('--text-dark-label');
      ref.current.style.removeProperty('--text-dark-secondary');
      ref.current.style.removeProperty('--text-dark-tertiary');
      // ref.current.style.removeProperty('--bg-light');
      ref.current.style.removeProperty('--text-dark-white');
    }
  });
}
