'use client';

import ButtonOutline from '@/components/ButtonOutline';
import ArrowUp from '@/components/Icons/arrow-up';

export default function ButtonTop() {
  const handleClick = () => {
    window.lenisRoot.current?.scrollTo(0, {
      duration: 2,
    });
  };

  return (
    <ButtonOutline mode="dark" className="!p-3" onClick={handleClick}>
      <div className="h-6 w-6">
        <ArrowUp />
      </div>
    </ButtonOutline>
  );
}
