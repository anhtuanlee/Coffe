'use client';
import ImagePreload from '@Components/ImagePreload';
import { useIsDesktop } from '@Hooks/useWindowResize';
import AvImageParallax from '@Interactive/ImageParallax/avImageParallax';
import React from 'react';

interface IImageParallax {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  scale?: number;
  className?: string;
  offset?: number;
  fit?: string;
}

export default function ImageParallax(props: IImageParallax): React.ReactElement {
  const { className, width, height, src, alt } = props;
  const isDesktop = useIsDesktop();
  const { fit } = props;
  return isDesktop ? (
    <AvImageParallax {...props} />
  ) : (
    <div className={`${className} imgParallax_inner`}>
      <ImagePreload width={width} height={height} src={src} alt={alt} fit={fit || 'contain'} />
    </div>
  );
}
