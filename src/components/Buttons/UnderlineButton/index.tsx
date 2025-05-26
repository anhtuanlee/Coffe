import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

import Underline from '@/interactive/UnlineHover';

import styles from './styles.module.scss';

interface IButtonProps extends PropsWithChildren {
  color?: 'white' | 'black-grey';
  size?: 36;
  lineSize?: 2 | 1 | 0;
  className?: string;
  onClick?: (e: React.MouseEvent | React.PointerEvent) => void;
}

const UnderlineButton: React.FC<IButtonProps> = ({
  color = 'white',
  size = 24,
  className,
  lineSize = 1,
  onClick,
  children,
}): React.ReactElement => {
  const buttonClasses = cn(
    styles.button,
    color && styles[`button__${color}`],
    lineSize && styles[`button__line_${lineSize}`],
    styles[`button__${size}`],
    className
  );

  return (
    <Underline color={color}>
      <button onClick={onClick} className={buttonClasses}>
        {children}
      </button>
    </Underline>
  );
};

export default UnderlineButton;
