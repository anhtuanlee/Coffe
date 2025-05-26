import { useGSAP } from '@gsap/react';
import { useIsInViewport } from '@Hooks/useIsInViewport';
import { isPlayState } from '@Layouts/Animation/animationSignal';
import { useComputed, useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { ReactElement, useRef, useState } from 'react';

import s from './styles.module.scss';

type IlistTexts = {
  listText: string[];
  type?: 'full' | 'typping';
};

export default function RandomTextList({ listText, type = 'full' }: IlistTexts): ReactElement {
  const refBg = useRef<HTMLSpanElement | null>(null);
  const refWrap = useRef<HTMLDivElement | null>(null);

  const idxRef = useRef<{ index: number; slideInterVal: null | GSAPTimeline }>({
    index: 0,
    slideInterVal: null,
  });
  const [activeText, setActiveText] = useState(0);
  const [currentText, setCurrentText] = useState(listText[0]);
  const { visible } = useIsInViewport({ ref: refWrap });

  useGSAP(() => {
    idxRef.current.slideInterVal = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      paused: true,
      onRepeat: () => {
        idxRef.current.index += 1;
        if (idxRef.current.index >= listText.length) idxRef.current.index = 0;
        const isLastText = idxRef.current.index === listText.length - 1;
        runAnimation(idxRef.current.index);
        setActiveText(idxRef.current.index);

        if (isLastText) {
          refWrap.current?.classList.add(s.listContent__textSpecial);
        } else {
          refWrap.current?.classList.remove(s.listContent__textSpecial);
        }
        setTimeout(() => {
          if (refWrap.current) {
            refWrap.current.style.width = `${refBg.current?.scrollWidth}px`;
          }
        }, 100);
      },
    });
    const test = { value: 0 };
    idxRef.current.slideInterVal.to(test, { value: 1 });
  });

  const runAnimation = (index: number): void => {
    let interval: NodeJS.Timeout | null = null;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const text = listText[index];
    const currentText = listText[index];
    let iteration = 0;
    interval && clearInterval(interval);
    interval = setInterval(() => {
      setCurrentText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration || letter === ' ') {
              return text[index];
            }

            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('')
      );

      if (type === 'typping') {
        if (iteration >= text.length) {
          interval && clearInterval(interval);
        }

        iteration += 1 / 3;
      } else if (type === 'full') {
        setTimeout(() => {
          interval && clearInterval(interval);
          setCurrentText(currentText);
        }, 400);
      }
    }, 30);
  };

  const isRun = useComputed(() => {
    return visible.value && isPlayState.peek();
  });

  useSignalEffect(() => {
    if (isRun) {
      idxRef.current.slideInterVal?.play();
    } else if (isPlayState.peek()) {
      idxRef.current.slideInterVal?.pause();
    }
  });
  return (
    <span ref={refWrap} className={s.listContent}>
      <span className={s.listContent_run}>{currentText}</span>
      <span ref={refBg} className={s.listContent_bg}>
        {listText[activeText]}
      </span>
    </span>
  );
}
