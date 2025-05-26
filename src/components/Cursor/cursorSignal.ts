import { signal } from '@preact/signals-react';

export const toggleCursorState = signal(false);

const show = (): void => {
  toggleCursorState.value = true;
};

const hide = (): void => {
  toggleCursorState.value = false;
};

export default function useCursorSignal(): { hide: () => void; show: () => void } {
  return { hide, show };
}
