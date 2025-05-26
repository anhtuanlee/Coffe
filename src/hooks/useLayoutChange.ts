'use client';
import { useEffect } from 'react';
import { create } from 'zustand';

type LayoutStore = {
  layout: number;
  toggleLayout: (number: number) => void;
};

const useLayoutStore = create<LayoutStore>((set) => {
  const initialLayout = 0;

  return {
    layout: initialLayout,
    toggleLayout: (newLayout: number): void => {
      set({ layout: newLayout });
      sessionStorage.setItem('layout', String(newLayout));
    },
  };
});

export { useLayoutStore };

export const useLayoutStoreEffect = (): void => {
  const { toggleLayout } = useLayoutStore();

  useEffect(() => {
    const storedLayout = sessionStorage.getItem('layout');

    if (storedLayout !== null) {
      const parsedLayout = parseInt(storedLayout, 10);
      toggleLayout(parsedLayout);
    }
  }, [toggleLayout]);
};
