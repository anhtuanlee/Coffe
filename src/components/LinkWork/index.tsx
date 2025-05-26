'use client';
import useRouterEffect from '@Hooks/useRouterEffect';
import { imageWorkEffectState } from '@Layouts/PageEffect/pageEffectSignal';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
  workThumbnail: string | null;
};
export default function LinkWork({
  href,
  className,
  target,
  children,
  workThumbnail,
}: Props): React.ReactElement {
  const { routerEffect } = useRouterEffect();
  return (
    <Link
      href={href}
      target={target}
      className={className}
      onClick={(e): void => {
        imageWorkEffectState.value = workThumbnail;
        routerEffect({ url: href, typeEffect: 'work' });
        e.preventDefault();
      }}
      passHref
    >
      {children}
    </Link>
  );
}
