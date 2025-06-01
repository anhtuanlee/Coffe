import { useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface UseMutationObserverProps {
  callback: MutationCallback;
  options?: MutationObserverInit;
  target?: HTMLElement | null;
  delay?: number;
}

const defaultOptions: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
};

export const useMutationObserver = ({
  callback,
  options = defaultOptions,
  target,
  delay = 250,
}: UseMutationObserverProps) => {
  const observerRef = useRef<MutationObserver | null>(null);
  const debouncedCallback = useDebounce(callback, delay);

  useEffect(() => {
    const element = target || document.body;

    if (!element) return;

    observerRef.current = new MutationObserver(debouncedCallback);
    observerRef.current.observe(element, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [debouncedCallback, options, target]);
};
