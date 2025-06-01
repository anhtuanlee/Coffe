import { cn } from '@/utils/uiHelper';
import React from 'react';
import ArrowRight from '../Icons/arrow-r';
type TButtonArrow = {
  label?: string;
  icon?: string;
  className?: string;
  type?: 'light' | 'dark';
} & React.HTMLAttributes<HTMLButtonElement>;

export default function ButtonArrow(props: TButtonArrow) {
  const { label, icon, className, type = 'light', children, ...rest } = props;
  const Icon = icon ? ArrowRight : ArrowRight;
  return (
    <button
      className={cn(
        'group flex flex-row items-center gap-2 text-18 text-txt-light-secondary',
        className
      )}
      {...rest}
    >
      <div className="hover-line !leading-[1.1] [&>*]:block [&>*]:!leading-[1.1]">
        {children ? children : <span className="block text-18 font-normal uppercase">{label}</span>}
      </div>
      <span className="h-6 w-6 transition-all duration-300 group-hover:translate-x-1">
        <Icon />
      </span>
    </button>
  );
}
