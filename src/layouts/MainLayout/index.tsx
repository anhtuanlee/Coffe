'use client';

import { DebugGrid } from '@Components/DebugGrid';
import LenisScroller from '@Components/Lenis';
import Animate from '@Layouts/Animation';
import React, { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animate>
        <LenisScroller>{children}</LenisScroller>
      </Animate>
      <DebugGrid />
    </>
  );
}
