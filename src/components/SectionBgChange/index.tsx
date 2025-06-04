'use client';

import { useTheme } from '@/store/ThemeProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import s from './styles.module.scss';

export default function SectionBgChange({ children }: PropsWithChildren): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { setNavigateTheme, setCurrentTheme, currentTheme } = useTheme();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const colorFromt: HTMLElement[] = gsap.utils.toArray('[data-theme]');

    colorFromt.forEach((el) => {
      const dataTheme: string = el.getAttribute('data-theme') || 'dark';
      const start = el.getAttribute('data-theme-start') || 'top center';
      const end = el.getAttribute('data-theme-end') || 'bottom center';
      const animation = (): void => {
        setCurrentTheme(dataTheme !== 'dark' ? 'light' : 'dark');
        setNavigateTheme(dataTheme === 'dark' ? 'light' : 'dark');
        refContent.current &&
          refContent.current.style.setProperty('--bg', `var(--bg-${dataTheme})`);
      };

      ScrollTrigger.create({
        trigger: el,
        start: start,
        end: end,
        onToggle: (s) => {
          s.isActive && animation();
        },
      });
    });
  }, []);

  return (
    <div className={s.bg} ref={refContent}>
      {children}
    </div>
  );
}
