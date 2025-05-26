import '@dotlottie/react-player/dist/index.css';

import { DotLottieCommonPlayer, DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import { useRef } from 'react';

import { useIsInViewport } from '@/hooks/useIsInViewport';

export default function WrapLottie({
  className,
  src,
}: {
  className?: string;
  src: string;
}): JSX.Element {
  const wrapperLottieRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<DotLottieCommonPlayer>(null);
  const { visible } = useIsInViewport({ ref: wrapperLottieRef });
  const isLoaded = useSignal<boolean>(false);
  useSignalEffect(() => {
    if (!lottieRef.current) return;
    if (isLoaded.value) {
      if (visible.value) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  });

  return (
    <div ref={wrapperLottieRef} className={className}>
      <DotLottiePlayer
        onEvent={(event): void => {
          if (event === PlayerEvents.Ready) {
            isLoaded.value = true;
          }
        }}
        ref={lottieRef}
        src={src}
        loop
      />
    </div>
  );
}
