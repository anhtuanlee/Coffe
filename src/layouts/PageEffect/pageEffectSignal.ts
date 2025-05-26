import { signal } from '@preact/signals-react';

import { ITypeEffect } from '@/types/common';

const toggleState = signal(false);
const outCompleteState = signal(false);
const inCompleteState = signal(false);
const typeState = signal<ITypeEffect>('page');
const urlState = signal('/');
const imageWorkEffectState = signal<string | null>(null);

type IValues = {
  animationIn: (url: string) => void;
  animationOut: () => void;
  setOutComplete: () => void;
  setInComplete: () => void;
  setTypeEffect: (b: 'page' | 'work') => void;
  reset: () => void;
};
export default function usePageEffectSignal(): IValues {
  return {
    animationIn: (url: string): void => {
      toggleState.value = true;
      urlState.value = url;
    },
    animationOut: (): void => {
      toggleState.value = false;
    },
    setOutComplete: (): void => {
      outCompleteState.value = false;
    },
    setInComplete: (): void => {
      inCompleteState.value = true;
    },
    setTypeEffect: (type: ITypeEffect): void => {
      typeState.value = type;
    },
    reset: (): void => {
      outCompleteState.value = false;
      inCompleteState.value = false;
      toggleState.value = false;
    },
  };
}

export {
  imageWorkEffectState,
  inCompleteState,
  outCompleteState,
  toggleState,
  typeState,
  urlState,
};
