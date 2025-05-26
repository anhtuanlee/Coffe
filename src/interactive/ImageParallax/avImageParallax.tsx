'use client';

import ImagePreload from '@Components/ImagePreload';
import useImageParallax from '@Interactive/ImageParallax/useImageParallax';
import React, { useRef } from 'react';

import s from './styles.module.scss';

interface IImageParallax {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  scale?: number;
  className?: string;
  offset?: number;
}

export default function AvImageParallax({
  src,
  alt,
  className = '',
  width,
  height,
  scale,
  offset,
}: IImageParallax): React.ReactElement {
  const refWrap = useRef<HTMLDivElement | null>(null);
  const refContent = useRef<HTMLImageElement | null>(null);

  useImageParallax({ refWrap, refContent, scale, offset });
  return (
    <div className={`${s.imgParallax} imgParallax`}>
      <div ref={refWrap} className={`${className} ${s.imgParallax_inner} imgParallax_inner`}>
        <ImagePreload
          width={width}
          height={height}
          ref={refContent}
          src={src}
          alt={alt}
          fit={'cover'}
        />
      </div>
    </div>
  );
}
