import { delay_trigger } from '@/constants/delay';
import HeadingChars from '@/interactive/Heading/Chars';
import { cn } from '@/utils/uiHelper';
import React from 'react';
type THeadingContent = {
  label?: string;
  title?: string;
  className?: string;
  type?: 'light' | 'dark';
} & React.HTMLAttributes<HTMLDivElement>;

export default function HeadingContent({
  label,
  title,
  className,
  type = 'dark',
  ...props
}: THeadingContent) {
  const isLight = type === 'dark';
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      {label && (
        <HeadingChars delayTrigger={delay_trigger._05} duration={0.8}>
          <div
            className={`font-body text-16 uppercase ${
              isLight ? 'text-txt-dark-secondary' : 'text-txt-light-secondary'
            }`}
          >
            {label}
          </div>
        </HeadingChars>
      )}
      {title && (
        <HeadingChars delayEnter={delay_trigger._1} delayTrigger={delay_trigger._15}>
          <div
            className={`font-title text-56 font-medium uppercase ${
              isLight ? 'text-txt-dark-primary' : 'text-txt-light-primary'
            }`}
          >
            {title}
          </div>
        </HeadingChars>
      )}
    </div>
  );
}
