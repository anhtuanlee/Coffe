'use client';

import { Signal, useSignal } from '@preact/signals-react';
import { createContext, PropsWithChildren, useContext } from 'react';
const ThemeContext = createContext<TThemeContext | null>(null);

type TTheme = 'light' | 'dark';
type TThemeContext = {
  currentTheme: Signal<TTheme>;
  navigateTheme: Signal<TTheme>;
  setNavigateTheme: (theme: TTheme) => void;
  setCurrentTheme: (theme: TTheme) => void;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
const ProviderTheme = ({ children }: PropsWithChildren) => {
  const currentTheme = useSignal<TTheme>('light');
  const navigateTheme = useSignal<TTheme>('dark');
  const setNavigateTheme = (theme: TTheme) => {
    navigateTheme.value = theme;
  };
  const setCurrentTheme = (theme: TTheme) => {
    currentTheme.value = theme;
  };
  return (
    <ThemeContext.Provider
      value={{ currentTheme, navigateTheme, setNavigateTheme, setCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ProviderTheme;
