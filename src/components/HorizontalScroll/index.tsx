// import CloseButton from '@Components/Buttons/CloseButton';
// import Lenis from '@studio-freight/lenis';
// import { ReactLenis } from '@studio-freight/react-lenis';
// import classNames from 'classnames';
// import { gsap } from 'gsap';
// import React, { PropsWithChildren, useEffect, useRef } from 'react';

// import s from './styles.module.scss';

// interface IHorizontalScroll extends PropsWithChildren {
//   setIsShow: (b: boolean) => void;
//   wrapperStyle?: string;
// }

// const HorizontalScroll: React.FC<IHorizontalScroll> = ({
//   setIsShow,
//   children,
//   wrapperStyle = '',
// }) => {
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const lenisRef = useRef<Lenis | undefined>();

//   const onClose = (): void => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;

//     gsap.to(wrapper, {
//       opacity: 0,
//       ease: 'power3.inOut',
//       duration: 0.8,
//       onComplete: () => {
//         wrapper.style.pointerEvents = 'none';
//         setIsShow(false);
//       },
//     });
//   };

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     lenisRef.current?.scrollTo(0);

//     gsap.fromTo(
//       wrapper,
//       { pointerEvents: 'auto', opacity: 0 },
//       {
//         opacity: 1,
//         ease: 'power3.inOut',
//         duration: 0.8,
//       }
//     );
//     setIsShow(true);
//   }, []);

//   useEffect(() => {
//     lenisRef.current?.stop();
//   }, []);

//   useEffect(() => {
//     function update(time: number): void {
//       lenisRef.current?.raf(time * 1000);
//     }

//     lenisRef.current?.start();
//     gsap.ticker.add(update);
//     return () => {
//       lenisRef.current?.stop();
//       gsap.ticker.remove(update);
//     };
//   }, []);

//   return (
//     <div ref={wrapperRef} className={classNames(wrapperStyle, s.horizontalScroll)}>
//       <CloseButton
//         classes={s.horizontalScroll_close}
//         lenisRef={lenisRef}
//         onClick={(): void => onClose()}
//       />

//       <ReactLenis
//         options={{
//           orientation: 'horizontal',
//           gestureOrientation: 'both',
//         }}
//         ref={lenisRef}
//         autoRaf={false}
//       >
//         {children}
//       </ReactLenis>
//     </div>
//   );
// };

// export default HorizontalScroll;
