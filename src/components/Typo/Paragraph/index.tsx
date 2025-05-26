import cn from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

interface TypographyProps extends PropsWithChildren {
  color?:
    | 'white'
    | 'black'
    | 'black-grey'
    | 'light-grey'
    | 'black-matter'
    | 'silver'
    | 'light-grey-3';
  size?: 32 | 24 | 18 | 14 | 12;
  className?: string;
}

const TypoParagraph = forwardRef<HTMLParagraphElement, TypographyProps>(
  (props: TypographyProps, ref) => {
    const { color, size = 24, className, children, ...restProps } = props;
    const paragraphClassNames = cn(
      styles.paragraph,
      color && styles[`paragraph__${color}`],
      styles[`paragraph__${size}`],
      className
    );
    return (
      <p {...restProps} ref={ref} className={paragraphClassNames}>
        {children}
      </p>
    );
  }
);

TypoParagraph.displayName = 'TypoParagraph';

export default TypoParagraph;
