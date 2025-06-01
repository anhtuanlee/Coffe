'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PropsWithChildren, ReactElement, useRef } from 'react';
import { useTheme } from '@/store/ThemeProvider';
import s from './styles.module.scss';

export default function SectionBgChange({ children }: PropsWithChildren): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { setNavigateTheme, setCurrentTheme, currentTheme } = useTheme();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const targetBgChange: HTMLElement[] = gsap.utils.toArray('.js-target-bgChange');
      const colorFromt: HTMLElement[] = gsap.utils.toArray('[data-theme]');

      const currentBgChange = targetBgChange[0] || refContent.current;

      colorFromt.forEach((el) => {
        const dataTheme: string = el.getAttribute('data-theme') || 'dark';
        //handle check last section in service to fix change background footer

        const animation = (): void => {
          setCurrentTheme(dataTheme !== 'dark' ? 'light' : 'dark');
          setNavigateTheme(dataTheme === 'dark' ? 'light' : 'dark');
          currentBgChange.style.setProperty('--bg', `var(--bg-${dataTheme})`);
        };

        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: `bottom 50%`,
          onToggle: (s) => {
            s.isActive && animation();
          },
        });
      });
    },
    { scope: refContent }
  );

  return (
    <div className={s.bg} ref={refContent}>
      {children}
    </div>
  );
}
