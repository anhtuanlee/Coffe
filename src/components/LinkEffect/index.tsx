'use client';
import useRouterEffect from '@Hooks/useRouterEffect';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
  onClick?: () => void;
};
export default function LinkEffect({
  href,
  className,
  target,
  children,
  onClick,
}: Props): React.ReactElement {
  const { routerEffect } = useRouterEffect();
  return (
    <Link
      href={href}
      target={target}
      className={className}
      onClick={(e): void => {
        routerEffect({ url: href, onClick });
        e.preventDefault();
      }}
      passHref
    >
      {children}
    </Link>
  );
}
