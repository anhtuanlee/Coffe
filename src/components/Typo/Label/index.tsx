import cn from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

interface TypoLabelProps extends PropsWithChildren {
  color?: 'white' | 'black' | 'black-grey' | 'light-grey' | 'black-matter' | 'silver';
  size?: 110 | 100 | 14 | 12;
  tag?: 'h4' | 'h5' | 'h6' | 'p' | 'span';
  isOpacity?: boolean;
  className?: string;
}

const TypoLabel = forwardRef<HTMLHeadingElement, TypoLabelProps>((props: TypoLabelProps, ref) => {
  const {
    color = 'white',
    size = 12,
    tag: Tag = 'span',
    isOpacity = false,
    className,
    children,
    ...restProps
  } = props;
  const headingClassNames = cn(
    styles.label,
    color && styles[`label__${color}`],
    styles[`label__${size}`],
    isOpacity && styles[`label__is-opacity`],
    className
  );
  return (
    <Tag {...restProps} ref={ref} className={headingClassNames}>
      {children}
    </Tag>
  );
});

TypoLabel.displayName = 'TypoLabel';

export default TypoLabel;
