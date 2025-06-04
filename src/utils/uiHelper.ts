import { ANIMATION_DELAY_ENTER } from '@/constants/animation';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { IAnimationElement } from '@/types/common';
import clsx from 'clsx';

export const pageScrollTop = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop || 0;
};

export const checkPageScrolled = (): boolean => {
  return pageScrollTop() > 10;
};

export const getDelay = ({
  refContentCurrent,
  delayEnter = 0,
  delayTrigger = 0,
}: {
  refContentCurrent: IAnimationElement | null;
  delayEnter?: number;
  delayTrigger?: number;
}): number => {
  if (!refContentCurrent) return 0;

  const { top } = refContentCurrent.getBoundingClientRect();
  if (top > window.innerHeight || checkPageScrolled()) {
    return delayTrigger;
  }
  return delayEnter + ANIMATION_DELAY_ENTER;
};

export const getSpaceTrigger = (el: IAnimationElement | null): number => {
  const trigger = window.innerHeight / 5;
  if (!el) return trigger;

  const { height } = el.getBoundingClientRect();
  if (height < trigger) return height;
  return trigger;
};

//eslint-disable-next-line
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null;

  return function (...args: Parameters<T>): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const gRefresh = (timeout = 1000): void => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, timeout);
};


export const handleConvertSize = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): { w: number; h: number } => {
  if (width <= 2560) return { w: width, h: height };
  return {
    w: 2560,
    h: (2560 * height) / width,
  };
};

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs as []));
}

export const convertRemToPx = (px: number) => {
  if (typeof window === 'undefined') {
    return px * 16;
  }
  const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  return px * rootFontSize;
};

export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions);
  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions);
  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions);
  const formattedDayWithTime = new Date(dateString).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const formattedDateNumber = new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return {
    dateTime: formattedDateTime, //May 23, 2025 10:30 AM
    dateOnly: formattedDate, //May 23, 2025
    timeOnly: formattedTime, //10:30 AM
    dataOnlyNumber: formattedDateNumber, //23/05/2025
    daysTime: formattedDayWithTime, //May 23, 2025 10:30 AM
  };
};
