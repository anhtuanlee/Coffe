import { MathLerp, MathMap } from '@Utils/mathUtils';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';

import s from './styles.module.scss';

interface IProps {
  className?: string;
  urlFrame: string;
  totalFrames: number;
  willLoad?: number;
  children: ReactNode;
  height?: number;
  width?: number;
  onProcessing?: (n: number) => void;
  preLoad: (b: number) => void;
  start?: () => void;
  end?: () => void;
}

interface IRefDomFrames {
  currentFrame: number;
  images: { image: HTMLImageElement; frame: number }[];
  lastFrame: number;
  progress: number;
  framesFirstLoad: number;
  currentUrlFrame?: string;
  ctx: CanvasRenderingContext2D | null;
  canvas?: HTMLCanvasElement;
  isLoaded: boolean;
  runFrame: null | (() => void);
}

export const Frames = ({
  className = '',
  urlFrame = '',
  totalFrames = 0,
  children,
  height = 1080,
  width = 1920,
  willLoad = 25,
  onProcessing,
  preLoad,
  start,
  end,
}: IProps): ReactElement => {
  const comp = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  const refCanavs = useRef<HTMLCanvasElement>(null);
  const refDom = useRef<IRefDomFrames>({
    currentFrame: 0,
    images: [],
    lastFrame: 1,
    progress: 0,
    framesFirstLoad: willLoad - 1,
    ctx: null,
    isLoaded: false,
    runFrame: null,
  });

  useEffect(() => {
    const registerImgDom = (frame: number, step = false): void => {
      if (frame > totalFrames) return;
      for (let i = frame; i < frame + willLoad; i++) {
        if (i > totalFrames) return;
        if (refDom.current.currentUrlFrame && !refDom.current.images[i]) {
          refDom.current.images[i] = {
            image: document.createElement('img'),
            frame: i,
          };
          refDom.current.images[i].image.src = refDom.current.currentUrlFrame.replace(
            '%d',
            Math.floor(i).toString()
          );
        }

        if (step) return;
      }
    };

    const drawFrame = (image: HTMLImageElement): void => {
      if (image.complete && image.naturalHeight !== 0) {
        refDom.current.ctx?.clearRect(
          0,
          0,
          refDom.current.canvas?.width || window.innerWidth,
          refDom.current.canvas?.height || window.innerHeight
        );
        refDom.current.ctx?.drawImage(image, 0, 0, 1920, 1080);
      }
    };

    const loadFrame = async (frame: number, onLoaded?: () => void | null): Promise<void> => {
      if (!refDom.current.currentUrlFrame) {
        refDom.current.currentUrlFrame = urlFrame;
        // (await webpSupported()) && webmFrame !== '' ? webmFrame : ;
      }

      if (frame > totalFrames || refDom.current.images[frame]) return;
      registerImgDom(frame, true);
      refDom.current.images[frame].image.onload = (): void => {
        if (!onLoaded) {
          if (refDom.current.currentFrame === refDom.current.images[frame].frame) {
            drawFrame(refDom.current.images[frame].image);
          }
        } else {
          onLoaded && onLoaded();
        }
      };
    };

    const loadFirstFrame = (): void => {
      const checkLoaded: Record<string, number> = { value: 0 };
      for (let i = 1; i <= refDom.current.framesFirstLoad; i++) {
        loadFrame(i, (): void => {
          checkLoaded.value++;
          preLoad(Math.floor((checkLoaded.value / refDom.current.framesFirstLoad) * 100));
          if (checkLoaded.value >= refDom.current.framesFirstLoad) {
            drawFrame(refDom.current.images[1].image);
            runCanvas();
          }
        });
      }
    };

    const runFrame = (): void => {
      const progress = refDom.current.progress || 0;

      const frameTmp: number = MathMap(progress, 0, 1, 1, totalFrames);
      refDom.current.lastFrame = Math.floor(MathLerp(refDom.current.lastFrame, frameTmp, 0.1));
      const frame = refDom.current.lastFrame;

      if (frame !== refDom.current.currentFrame) {
        onProcessing && onProcessing(frame);

        refDom.current.currentFrame = frame;
        if (!refDom.current.images[frame]) {
          loadFrame(frame);
        } else if (
          refDom.current.images[frame] &&
          refDom.current.currentFrame === refDom.current.images[frame].frame
        ) {
          registerImgDom(frame + refDom.current.framesFirstLoad);
          drawFrame(refDom.current.images[frame].image);
        }
      }
    };

    const runCanvas = async (): Promise<void> => {
      if (!comp.current || !refCanavs.current) return;

      const rect: DOMRect | undefined = comp.current?.getBoundingClientRect();
      refCanavs.current.width = width || rect?.width || window.innerWidth;
      refCanavs.current.height = height || rect?.height || window.innerHeight;
      refDom.current.ctx = refCanavs.current.getContext('2d');

      runFrame();
    };

    if (!refDom.current.isLoaded) {
      refDom.current.isLoaded = true;
      refDom.current.runFrame = runFrame;
      loadFirstFrame();
    }
  }, [end, height, onProcessing, preLoad, start, totalFrames, urlFrame, width, willLoad]);
  useEffect(() => {
    const gsapContext = gsap.context(() => {
      ScrollTrigger.create({
        trigger: comp.current,
        start: 'top top',
        end: () => `+=${MathMap(totalFrames, 0, 60, 0, window.innerHeight)}px top`,
        onUpdate: (self: ScrollTrigger) => {
          refDom.current.progress = self.progress;

          if (refInner.current) {
            refInner.current.style.transform = `translate3d(0px, ${
              Math.max(self.progress - 0.8, 0) * window.innerHeight
            }px, 0px )`;
          }

          refDom.current?.runFrame && refDom.current.runFrame();
        },
      });
      ScrollTrigger.create({
        trigger: comp.current,
        start: 'top top',
        pin: true,
        invalidateOnRefresh: true,
        end: () => `+=${MathMap(totalFrames, 0, 60, 0, window.innerHeight)}px bottom`,
      });

      ScrollTrigger.refresh();
    }, [comp, refInner]);

    return () => gsapContext?.revert();
  }, []);

  return (
    <div className={classNames(className, s.frames)} ref={comp}>
      <div ref={refInner} className="h-full">
        <div className={s.frames_inner}>{children}</div>
        <canvas ref={refCanavs} />
      </div>
    </div>
  );
};
