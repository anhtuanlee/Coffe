import { signal } from '@preact/signals-react';
import { proxy } from 'valtio';

type IValue = {
  out: () => void;
  play: () => void;
  reset: () => void;
  setPlayed: () => void;
  playForPopup: () => void;
  resetForPopup: () => void;
};

const isPlayState = signal<boolean>(false);
const isPlayedState = signal<boolean>(false);
const isPlayForPopupState = signal<boolean>(false);
const isOutState = signal<boolean>(false);

const proxyAnimationOuting = proxy<{ animates: { top: number; out: () => void }[] }>({
  animates: [],
});

export default function useAnimationSignal(): IValue {
  return {
    out: (): void => {
      isOutState.value = true;
    },
    play: (): void => {
      isPlayState.value = true;
    },
    reset: (): void => {
      isPlayState.value = false;
      isOutState.value = false;
    },
    setPlayed: (): void => {
      isPlayedState.value = true;
    },
    playForPopup: (): void => {
      isPlayForPopupState.value = true;
    },
    resetForPopup: (): void => {
      isPlayForPopupState.value = false;
    },
  };
}

export { isOutState, isPlayedState, isPlayForPopupState, isPlayState, proxyAnimationOuting };
