import BoxSnap, { IBoxSnap } from '@/interactive/BoxSnap/Bottom';
import { cn } from '@/utils/uiHelper';
import React from 'react';

type TBoxCircle = {
  children: React.ReactNode;
  colorCircle?: string;
  className?: string;
} & IBoxSnap;
export default function BoxCircle(props: TBoxCircle) {
  const { children, className, colorCircle, ...rest } = props;

  return (
    <BoxSnap {...rest}>
      <div className={cn('relative flex size-full items-center justify-center', className)}>
        <div
          data-circle
          className={cn(
            'absolute inset-0 z-20 rounded-full border border-solid border-txt-dark-secondary',
            colorCircle
          )}
        />
        <div data-child-inner className="absolute z-30 w-max">
          {props.children}
        </div>
      </div>
    </BoxSnap>
  );
}
