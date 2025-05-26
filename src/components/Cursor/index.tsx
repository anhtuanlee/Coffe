'use client';

import { toggleCursorState } from '@Components/Cursor/cursorSignal';
import { TypoLabel } from '@Components/Typo';
import { useGSAP } from '@gsap/react';
import useWindowResize from '@Hooks/useWindowResize';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import React, { ReactElement, useRef } from 'react';
import { proxy } from 'valtio';

import s from './styles.module.scss';

export default function Cursor(): ReactElement {
  const refCursor = useRef<HTMLDivElement>(null);
  const { isDesktop } = useWindowResize();
  const refQuicks = proxy<{ x: gsap.QuickToFunc | null; y: gsap.QuickToFunc | null }>({
    x: null,
    y: null,
  });

  const { contextSafe } = useGSAP(() => {}, { scope: refCursor });

  const cursorIn = contextSafe(() => {
    gsap.to(refCursor.current, {
      '--circle': '50%',
      ease: 'power3.out',
      duration: 0.6,
    });
    gsap.fromTo(
      '.js_cursor__text',
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        delay: 0.15,
        ease: 'power3.out',
      }
    );
    gsap.fromTo(
      '.js_cursor__arrow',
      {
        x: '-100%',
        opacity: 0,
      },
      {
        x: '0%',
        opacity: 1,
        duration: 0.6,
        delay: 0.15,
        ease: 'power3.out',
      }
    );
  });

  const cursorOut = contextSafe(() => {
    gsap.to(refCursor.current, { '--circle': '0%', ease: 'power3.out', duration: 0.6 });
    gsap.to('.js_cursor__text', {
      y: '-100%',
      opacity: 0,
      duration: 0.4,
      ease: 'power3.out',
    });
    gsap.to('.js_cursor__arrow', {
      x: '100%',
      opacity: 0,
      duration: 0.4,
      ease: 'power3.out',
    });
  });

  useSignalEffect(() => {
    if (toggleCursorState.value) {
      cursorIn();
    } else {
      cursorOut();
    }
  });

  useSignalEffect(() => {
    if (!isDesktop.value) return;
    refQuicks.x = gsap.quickTo(refCursor.current, 'x', { duration: 0.4, ease: 'power3' });
    refQuicks.y = gsap.quickTo(refCursor.current, 'y', { duration: 0.4, ease: 'power3' });

    refQuicks.x && refQuicks.x(window.innerWidth / 2);
    refQuicks.y && refQuicks.y(window.innerHeight / 2);

    const onMouseMove = (e: MouseEvent): void => {
      if (!refCursor.current) return;

      const rectCursor = refCursor.current.getBoundingClientRect();

      const disX = e.clientX - rectCursor.width / 2;
      const disY = e.clientY - rectCursor.height / 2;

      refQuicks.x && refQuicks.x(disX);
      refQuicks.y && refQuicks.y(disY);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  });

  return (
    <div className={s.wrapCursor}>
      <div className={s.cursor} ref={refCursor}>
        <div className={s.cursor_view}>
          <div className={s.cursor_view_inner}>
            <TypoLabel className="js_cursor__text cursor__text" color="black">
              VIEW
            </TypoLabel>
            <span className={s.cursor_view_icon}>
              <Image
                className="js_cursor__arrow"
                src={'/svg/arrow-right.svg'}
                alt={'arrow-right'}
                width={12}
                height={12}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
