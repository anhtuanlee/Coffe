'use client';

import Image, { ImageProps } from 'next/image';
import { forwardRef, useMemo, useRef } from 'react';

import { handleConvertSize } from '@/utils/uiHelper';

import s from './style.module.scss';

interface IImagePlaceholder extends ImageProps {
  fit?: string;
  className?: string;
}

const ImagePlaceholder = forwardRef<HTMLImageElement, IImagePlaceholder>((props, ref) => {
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
      imageLoadedRef.current?.classList.add(s.imagePlaceholder_placeholder_isLoaded);
    setTimeout(() => {
      imageLoadedRef.current?.remove();
    }, 100);
  };

  return (
    <div
      ref={ref}
      className={`${s.imagePlaceholder} ${s[obfit]} ${props.className} imagePlaceholder`}
    >
      <Image
        className={` ${s.imagePlaceholder_origin}`}
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
        className={`${s.imagePlaceholder_placeholder}`}
        src={props.src}
        width={100}
        height={100}
        loading="eager"
        alt="eager"
      />
    </div>
  );
});

ImagePlaceholder.displayName = 'ImagePlaceholder';
export default ImagePlaceholder;
