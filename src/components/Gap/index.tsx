import s from './style.module.scss';

interface IGap {
  size?: 'sm' | 'lg' | 'md' | 'xl';
}

export default function Gap({ size = 'sm' }: IGap): React.ReactElement {
  return <div className={s[size]} />;
}
