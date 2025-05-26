import { useIsInViewport } from '@Hooks/useIsInViewport';
import { useSignalEffect } from '@preact/signals-react';
import { forwardRef, useEffect, useRef, VideoHTMLAttributes } from 'react';

import s from './style.module.scss';

const VideoPreload = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(
  (props, ref) => {
    const refWrap = useRef<HTMLDivElement>(null);

    const refVideo = useRef<HTMLVideoElement | null>();
    const { visible } = useIsInViewport({ ref: refWrap });

    useEffect(() => {
      if (!refWrap.current) return;
      refVideo.current = refWrap.current.querySelector<HTMLVideoElement>('video');
    }, []);

    useSignalEffect(() => {
      if (visible.value) {
        refVideo.current?.play();
      } else {
        refVideo.current?.pause();
      }
    });

    return (
      <div className={s.video} ref={refWrap}>
        <video ref={ref} {...props} />
      </div>
    );
  }
);

VideoPreload.displayName = 'VideoPreload';

export default VideoPreload;
