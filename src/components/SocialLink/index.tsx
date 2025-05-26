import Fade from '@Interactive/Fade';
import Underline from '@Interactive/UnlineHover';
import { PropsWithChildren, ReactElement } from 'react';

import { TypoLabel } from '../Typo';

interface IProps extends PropsWithChildren {
  href: string;
  labelTag?: 'h4' | 'h5' | 'h6' | 'p' | 'span';
  color?: 'white' | 'black' | 'black-grey';
  delayEnter?: number;
  delayTrigger?: number;
}

export default function SocialLink({
  href,
  labelTag,
  color = 'black',
  children,
  delayEnter,
  delayTrigger,
}: IProps): ReactElement {
  return (
    <Fade delayEnter={delayEnter} delayTrigger={delayTrigger} direction={'bottom'} from={'100%'}>
      <div>
        <Underline>
          <a href={href} target={'_blank'} className="overflow-hidden">
            <TypoLabel color={color} tag={labelTag}>
              {children}
            </TypoLabel>
          </a>
        </Underline>
      </div>
    </Fade>
  );
}
