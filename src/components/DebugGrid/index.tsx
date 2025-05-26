'use client';
import cn from 'classnames/bind';
import React, { useCallback, useEffect, useState } from 'react';

import s from './style.module.scss';

const cx = cn.bind(s);

export const DebugGrid = (): JSX.Element => {
  const [isGird, setIsGrid] = useState(false);
  const handleKeyDown: (ev: KeyboardEvent) => void = useCallback(
    (ev: KeyboardEvent) => {
      const key = ev.which || ev.keyCode;
      const isShift = !!ev.shiftKey;
      if (isShift && key === 71) {
        localStorage.setItem('isGrid', String(!isGird));
        setIsGrid(!isGird);
      }
    },
    [isGird]
  );

  useEffect(() => {
    const localIsGrid = localStorage.getItem('isGrid');
    if (localIsGrid === 'true') {
      setIsGrid(true);
    }
    window.addEventListener('keydown', handleKeyDown);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isGird]);

  return (
    <div className={cx('grid-debug', `${isGird ? '' : 'hidden'}`)}>
      <div className="container">
        <div className="grid lg:grid-cols-12 xs:grid-cols-6 sm:grid-cols-8 ">
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
          <div className="debug_col xs:hidden sm:block col-span-1"></div>
        </div>
      </div>
    </div>
  );
};
