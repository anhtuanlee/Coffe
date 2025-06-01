import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useImperativeHandle,
  useRef,
} from 'react';

import s from './style.module.scss';

export type IHover = { onHover: () => void; onLeave: () => void };
interface IProp extends PropsWithChildren {
  refFuns: MutableRefObject<IHover | undefined>;
  immutable?: boolean;
  className?: string;
  classNameClone?: string;
  isReverse?: boolean;
}
export default function TextMask({
  children,
  refFuns,
  immutable = false,
  className,
  isReverse = false,
  classNameClone,
}: IProp): ReactElement {
  const refContent = useRef<HTMLSpanElement>(null);
  const { contextSafe } = useGSAP(
    () => {
      const lists: HTMLElement[] = gsap.utils.toArray('.js-text');
      gsap.killTweensOf(lists);
      gsap.set(lists[1], { y: '110%' });
    },
    { scope: refContent }
  );

  const onHover = contextSafe((): void => {
    const sps: HTMLElement[] = gsap.utils.toArray('.js-text');
    gsap.killTweensOf(sps);

    sps[0] &&
      gsap.fromTo(
        sps[0],
        {
          y: 0,
        },
        { y: '-110%', ease: 'power3.out', duration: 0.6, overwrite: 'auto' }
      );
    sps[1] &&
      gsap.fromTo(
        sps[1],
        { y: '110%' },
        {
          y: 0,
          ease: 'power3.out',
          duration: 0.6,
          overwrite: 'auto',
        }
      );
  });

  const onLeave = contextSafe((): void => {
    const sps: HTMLElement[] = gsap.utils.toArray('.js-text');
    gsap.killTweensOf(sps);

    sps[0] &&
      gsap.fromTo(
        sps[0],
        {
          y: isReverse ? '110%' : '-110%',
        },
        { y: 0, ease: 'power3.out', duration: 0.6, overwrite: 'auto' }
      );
    sps[1] &&
      gsap.fromTo(
        sps[1],
        {
          y: 0,
        },
        {
          y: isReverse ? '-110%' : '110%',
          ease: 'power3.out',
          duration: 0.6,
          overwrite: 'auto',
        }
      );
  });

  useImperativeHandle(refFuns, () => ({
    onHover,
    onLeave,
  }));
  return (
    <span ref={refContent} className={`${s.textMask} ${className} textMask`}>
      <span className={`js-text block ${s.textMask_el} textMask_el`}>{children}</span>
      <span
        className={`js-text block ${s.textMask_el} ${s.textMask_el__clone} ${
          immutable && s.textMask_el__imutable
        } textMask_el textMask_el__clone ${classNameClone}`}
      >
        {children}
      </span>
    </span>
  );
}
