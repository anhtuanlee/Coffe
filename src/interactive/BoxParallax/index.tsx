'use client';

import { useIsMobile } from '@Hooks/useWindowResize';
import BoxParallaxAdvance from '@Interactive/BoxParallax/indexAdvance';
import BoxParallaxLite from '@Interactive/BoxParallax/indexLite';
import React, { PropsWithChildren } from 'react';

interface IBoxParallax extends PropsWithChildren {
  className?: string;
  offset?: number;
  isObserver?: boolean;
  isAnimation?: boolean;
  delayEnter?: number;
  delayTrigger?: number;
}

export default function BoxParallax(props: IBoxParallax): React.ReactElement {
  const isMobile = useIsMobile();
  return isMobile ? <BoxParallaxLite {...props} /> : <BoxParallaxAdvance {...props} />;
}
