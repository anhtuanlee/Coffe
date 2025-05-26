'use client';

import ImagePreload from '@Components/ImagePreload';
import { useGSAP } from '@gsap/react';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { TSizeBtn } from '@/types/common';
import { MathMap } from '@/utils/mathUtils';

import s from './styles.module.scss';

interface IProp extends PropsWithChildren {
  size: TSizeBtn;
}

export default function CursorImage({ children, size }: IProp): ReactElement {
  const listImage = [
    '/images/cursor_2.jpg',
    '/images/cursor_3.jpg',
    '/images/cursor_4.jpg',
    '/images/cursor_5.jpg',
  ];
  const refContent = useRef<HTMLDivElement>(null);
  const refCursor = useRef<HTMLDivElement>(null);
  const currentActiveIdx = useRef<number>(0);

  const { contextSafe } = useGSAP(
    (_con, contextSafeSc) => {
      if (!contextSafeSc) return;
      if (!refContent.current || !refCursor.current) return;

      refCursor.current && gsap.set(refCursor.current, { opacity: 0 });
      const layerImages: HTMLElement[] = gsap.utils.toArray('.js-layer');
      const posLayers: { poX: gsap.QuickToFunc | null; poY: gsap.QuickToFunc | null }[] = [];

      layerImages.forEach((layer, index) => {
        const poX = gsap.quickTo(layer, 'x', {
          duration: 0.4 + index / 5,
          ease: 'power3',
        });

        const poY = gsap.quickTo(layer, 'y', {
          duration: 0.4 + index / 5,
          ease: 'power3',
        });

        posLayers.push({ poX, poY });
      });

      const onMouseMove = contextSafeSc((e: MouseEvent): void => {
        if (!refContent.current || !refCursor.current) return;

        const rectWrap = refContent.current.getBoundingClientRect();
        const rectCursor = refCursor.current.getBoundingClientRect();

        const disX = e.clientX - rectWrap.left - rectCursor.width / 2;
        const disY = e.clientY - rectWrap.top - rectCursor.height / 2;

        posLayers.length &&
          posLayers.forEach((po) => {
            po.poX && po.poX(disX);
            po.poY && po.poY(disY);
          });

        let x = Math.floor(
          MathMap(e.clientX - rectWrap.left, 0, rectWrap.width, 0, listImage.length)
        );
        x = Math.min(Math.max(0, x), listImage.length);
        if (currentActiveIdx.current !== x) {
          for (let i = 0; i < listImage.length; i++) {
            if (i !== x) {
              gsap.set(`.js-layer__${i}_image`, { opacity: 0 });
            }
          }
          gsap.set(`.js-layer__${x}_image`, { opacity: 1 });
          currentActiveIdx.current = x;
        }
      });

      const init = (): void => {
        if (!refContent.current || !refCursor.current) return;
        const rectWrap = refContent.current.getBoundingClientRect();
        const rectCursor = refCursor.current.getBoundingClientRect();

        const disX = (rectWrap.width - rectCursor.width) / 2;
        const disY = (rectWrap.height - rectCursor.height) / 2;

        posLayers.length &&
          posLayers.forEach((po) => {
            po.poX && po.poX(disX);
            po.poY && po.poY(disY);
          });
      };

      init();
      refContent.current?.addEventListener('mousemove', onMouseMove);
      return () => {
        refContent.current?.removeEventListener('mousemove', onMouseMove);
      };
    },
    { scope: refContent }
  );

  const toggleCursor = contextSafe((isOpen: boolean) => {
    if (isOpen) {
      refCursor.current &&
        gsap.to(refCursor.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
        });
    } else {
      refCursor.current &&
        gsap.to(refCursor.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power3.out',
        });
    }
  });

  return (
    <div
      className={s.wrapCursor}
      ref={refContent}
      onMouseEnter={(): void => {
        toggleCursor(true);
      }}
      onMouseLeave={(): void => {
        toggleCursor(false);
      }}
    >
      {children}

      <div className={cn(s.cursor, s[`cursor__${size}`])} ref={refCursor}>
        <div className={s.cursor_view}>
          <div className={`${s.layer__1} ${s.layer} js-layer`}>
            {listImage.map((img, index) => {
              const key = `layer_1_${img}-${index}`;
              return (
                <div key={key} className={`${s.layer_img} js-layer__${index}_image`}>
                  <ImagePreload key={key} src={img} alt={'arrow-right'} width={716} height={726} />
                </div>
              );
            })}
          </div>
          <div className={`${s.layer__2} ${s.layer} js-layer`}>
            {listImage.map((img, index) => {
              const key = `layer_2_${img}-${index}`;
              return (
                <div key={key} className={`${s.layer_img} js-layer__${index}_image`}>
                  <ImagePreload key={key} src={img} alt={'arrow-right'} width={716} height={726} />
                </div>
              );
            })}
          </div>
          <div className={`${s.layer__3} ${s.layer} js-layer`}>
            {listImage.map((img, index) => {
              const key = `layer_3_${img}-${index}`;
              return (
                <div key={key} className={`${s.layer_img} js-layer__${index}_image`}>
                  <ImagePreload key={key} src={img} alt={'arrow-right'} width={716} height={726} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
