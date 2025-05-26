'use client';

import useBoxMaskCenter from '@Interactive/BoxMask/Center/useBoxMaskCenter';
import React, { PropsWithChildren, useRef } from 'react';

import s from './styles.module.scss';

interface IBoxMaskCenter extends PropsWithChildren {
  ease?: string;
  duration?: number;
}

export default function BoxMaskCenter({
  children,
  ease,
  duration,
}: IBoxMaskCenter): React.ReactElement {
  const refTrigger = useRef<HTMLDivElement>(null);
  useBoxMaskCenter({ refTrigger, ease, duration });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return React.cloneElement(children, {
    ...{ ref: refTrigger, className: `${s.boxMaskCenter} ${children.props.className || ''}` },
  });
}
