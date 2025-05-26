'use client';

import useAnimationSignal from '@Layouts/Animation/animationSignal';
import useLoadManageSignal, { loadedSate, loadState } from '@Layouts/Animation/loadManageSignal';
import useWorkPageSignal from '@Modules/WorkPage/useWorkPageSignal';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useStoreStage } from '@/stores/useStoreStage';

export default function useLogicAnimate(): void {
  const pathName = usePathname();
  const { reset: resetAnimation, resetForPopup } = useAnimationSignal();
  const { reset: resetLoader } = useLoadManageSignal();
  const { resetWork } = useWorkPageSignal();
  const { resetIdProgress } = useStoreStage();

  //page change
  useEffect(() => {
    resetLoader();
    resetForPopup();
    resetAnimation();
    resetIdProgress();

    resetWork();
    let dbCheckLoaded = 0;

    const clearTime = setInterval(() => {
      if (loadState.peek() <= 0) {
        dbCheckLoaded++;
      } else {
        dbCheckLoaded--;
        dbCheckLoaded = Math.max(dbCheckLoaded, 0);
      }
      if (dbCheckLoaded > 3) {
        loadedSate.value = true;
        clearInterval(clearTime);
      }
    }, 50);

    return (): void => {
      clearInterval(clearTime);
    };
  }, [pathName]);
}
