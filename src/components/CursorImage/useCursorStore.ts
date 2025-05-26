import { signal } from '@preact/signals-react';

export const isShow = signal(false);
export const idImage = signal<number>(-1);

const show = (): void => {
  isShow.value = true;
};

const hide = (): void => {
  isShow.value = false;
};
const setIdImage = (id: number): void => {
  idImage.value = id;
};

export default function useCursorImageStore(): {
  hide: () => void;
  show: () => void;
  setIdImage: (id: number) => void;
} {
  return { hide, show, setIdImage };
}
