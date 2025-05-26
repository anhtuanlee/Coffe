'use client';

import Image, { ImageProps } from 'next/image';
import { forwardRef, useMemo, useRef } from 'react';

import { handleConvertSize } from '@/utils/uiHelper';

import s from './style.module.scss';

interface IImagePreload extends ImageProps {
  fit?: string;
  className?: string;
}

const ImagePreload = forwardRef<HTMLImageElement, IImagePreload>((props, ref) => {
  const imageLoadedRef = useRef<HTMLImageElement>(null);
  const obfit = useMemo((): string => {
    return props.fit || 'cover';
  }, [props.fit]);

  const { w, h } = handleConvertSize({
    width: props.width as number,
    height: props.height as number,
  });

  const onLoaded = (): void => {
    imageLoadedRef.current &&
      imageLoadedRef.current?.classList.add(s.imagePreload_placeholder_isLoaded);
    setTimeout(() => {
      imageLoadedRef.current?.remove();
    }, 100);
  };

  return (
    <div ref={ref} className={`${s.imagePreload} ${s[obfit]} ${props.className} imagePreload`}>
      <Image
        className={`${props.className} ${s.imagePreload_origin}`}
        onLoad={onLoaded}
        sizes={`(max-width: ${w}px) 100vw, ${w}px`}
        {...props}
        width={w}
        height={h}
        alt={props.alt}
        quality={100}
      />
      <Image
        ref={imageLoadedRef}
        className={`${props.className} ${s.imagePreload_placeholder}`}
        src={props.src}
        width={100}
        height={100}
        loading="eager"
        alt="eager"
      />
    </div>
  );
});

ImagePreload.displayName = 'ImagePreload';
export default ImagePreload;
