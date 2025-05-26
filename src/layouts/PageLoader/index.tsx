import { useGSAP } from '@gsap/react';
import useAnimationSignal from '@Layouts/Animation/animationSignal';
import { loadedSate } from '@Layouts/Animation/loadManageSignal';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

import s from './styles.module.scss';

export default function PageLoader(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { play, setPlayed } = useAnimationSignal();
  const { contextSafe } = useGSAP();

  const pageIn = contextSafe(() => {
    setTimeout(() => {
      play();
      setPlayed();
    }, 400);
    window.scroll(0, 0);
    gsap.to(refContent.current, {
      opacity: 0,
      ease: 'power3.inOut',
      duration: 0.6,
      onComplete: () => {
        refContent.current?.classList.add(s.isHide);
      },
    });
  });
  useSignalEffect(() => {
    loadedSate.value && pageIn();
  });
  return <div className={s.pageLoader} ref={refContent}></div>;
}
