import { signal, Signal, useSignal } from '@preact/signals-react';
import { createContext, PropsWithChildren, useContext } from 'react';

type THeaderContext = {
  isOpenHeader: Signal<boolean>;
  setIsOpenHeader: (isOpen?: boolean) => void;
};

export const HeaderContext = createContext<THeaderContext | null>(null);
export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
export const isOpenHeader = signal(false);
export const HeaderProvider = ({ children }: PropsWithChildren) => {
  const setIsOpenHeader = (isOpen?: boolean) => {
    isOpenHeader.value = !!isOpen;
  };
  return (
    <HeaderContext.Provider value={{ isOpenHeader, setIsOpenHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};
