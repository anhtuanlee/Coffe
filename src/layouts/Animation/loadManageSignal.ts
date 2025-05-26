import { signal } from '@preact/signals-react';

type IValue = {
  registerLoad: () => void;
  unRegisterLoad: () => void;
  reset: () => void;
};

export const loadState = signal(0);
export const loadedSate = signal(false);

export default function useLoadManageSignal(): IValue {
  return {
    registerLoad: (): void => {
      loadState.value += 1;
    },
    unRegisterLoad: (): void => {
      loadState.value -= 1;
    },
    reset: (): void => {
      loadState.value = 0;
      loadedSate.value = false;
    },
  };
}
