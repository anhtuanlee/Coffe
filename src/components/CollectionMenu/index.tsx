'use client';

import { cn, convertRemToPx } from '@/utils/uiHelper';
import { useEffect, useMemo, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import ButtonArrow from '../ButtonArrow';
import ArrowSpL from '../Icons/arrow-sp-l';
import ArrowSpR from '../Icons/arrow-sp-r';
import ProductItem, { TProduct } from '../ProductItem';
import styles from './styles.module.scss';
import Fade from '@/interactive/Fade';
import HeadingChars from '@/interactive/Heading/Chars';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import { delay_trigger } from '@/constants/delay';
import ParagraphLineMask from '@/interactive/Paragraph/Line/Mask';

type TCollectionMenu = {
  title: string;
  description: string;
  product: TProduct[];
};

export default function CollectionMenu(props: TCollectionMenu) {
  const { title, description, product } = props;
  const [currentType, setCurrentType] = useState<string>('');
  const handleConvertProduct = () => {
    return product.reduce((acc: Record<string, TProduct[]>, curr, index) => {
      const category = curr.category.toLowerCase();
      if (acc[category]) {
        acc[category].push(curr);
      } else {
        acc[category] = [curr];
      }
      return acc;
    }, {});
  };
  const dataConvert = handleConvertProduct();

  useEffect(() => {
    if (Object.keys(dataConvert).length > 0) {
      setCurrentType(Object.keys(dataConvert)[0]);
    }
  }, []);
  const productList = useMemo(() => {
    return dataConvert[currentType];
  }, [currentType, dataConvert]);
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex flex-row items-start justify-between">
          <div className="flex max-w-[36.75rem] flex-col gap-2.5">
            {title && (
              <HeadingChars delayTrigger={0.1}>
                <h3 className="font-title text-24 font-medium text-txt-light-primary">{title}</h3>
              </HeadingChars>
            )}
            {description && (
              <ParagraphLineFade delayTrigger={delay_trigger._05}>
                <div className="text-16 text-txt-light-secondary">{description}</div>
              </ParagraphLineFade>
            )}
          </div>
          <ButtonArrow label="View All" className="!text-txt-light-primary" />
        </div>
        <div className="relative flex flex-col">
          <div className="progress my-5 h-[1px] w-full"></div>
          <div className="mb-12 flex flex-row gap-4">
            {Object.keys(dataConvert).map((item, index) => (
              <ParagraphLineMask delayTrigger={index * 0.1} delayEnter={index * 0.1} key={index}>
                <div
                  key={index}
                  onClick={() => setCurrentType(item)}
                  className={`cursor-pointer py-2.5 text-18 font-medium uppercase transition-all duration-300 hover:text-txt-light-primary ${
                    currentType === item ? 'text-txt-light-primary' : 'text-txt-light-primary/50'
                  }`}
                >
                  {item}
                </div>
              </ParagraphLineMask>
            ))}
          </div>
          {productList && <ProductList product={productList} type={currentType} />}
        </div>
      </div>
    </div>
  );
}

const ProductList = (props: { product: TProduct[]; type: string }) => {
  const { product, type } = props;
  const ref = useRef<SwiperRef>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(false);

  useEffect(() => {
    ref.current?.swiper.init();
    setIsEnd(ref.current?.swiper.isEnd || false);
    setIsBeginning(ref.current?.swiper.isBeginning || false);
  }, [type]);

  return (
    <div className={cn('w-full', styles.productList)}>
      <Swiper
        ref={ref}
        modules={[Navigation, Pagination]}
        spaceBetween={convertRemToPx(1.25)}
        slidesPerView={4}
        navigation
        watchSlidesProgress
        watchOverflow={true}
        pagination={{
          type: 'progressbar',
        }}
        onInit={(swiper) => {
          setIsEnd(swiper.isEnd);
          setIsBeginning(swiper.isBeginning);
        }}
        onSwiper={(swiper) => {
          setIsEnd(swiper.isEnd);
          setIsBeginning(swiper.isBeginning);
        }}
        onSlideChange={(swiper) => {
          setIsEnd(swiper.isEnd);
          setIsBeginning(swiper.isBeginning);
        }}
        onNavigationPrev={() => console.log('prev')}
        hashNavigation
        onNavigationNext={() => console.log('next')}
      >
        <div
          onClick={() => ref.current?.swiper.slideNext()}
          className={`swiper-button-next flex !h-12 !w-12 items-center justify-center rounded-full bg-white/80 transition-all duration-300 hover:bg-white ${
            isEnd && 'opacity-0'
          }`}
        >
          <div className="h-6 w-6">
            <ArrowSpR />
          </div>
        </div>

        <div
          onClick={() => ref.current?.swiper.slidePrev()}
          className={`swiper-button-prev flex !h-12 !w-12 items-center justify-center rounded-full bg-white/80 transition-all duration-300 hover:bg-white ${
            isBeginning && 'opacity-0'
          }`}
        >
          <div className="h-6 w-6">
            <ArrowSpL />
          </div>
        </div>
        {product?.map((item, index) => (
          <SwiperSlide
            key={`${item.name}-${item.category}-${index}`}
            virtualIndex={index}
            className="select-none"
          >
            <Fade delayTrigger={index * 0.1} delayEnter={index * 0.1}>
              <div className="opacity-0">
                <ProductItem {...item} />
              </div>
            </Fade>
          </SwiperSlide>
        ))}
        <SwiperSlide
          key={`empty-${product.length}-${type}`}
          className="flex aspect-[377/430] h-full !items-center !justify-center"
        >
          <Fade delayTrigger={(product.length - 1) * 0.1} delayEnter={delay_trigger._05}>
            <div className="h-full opacity-0">
              <div className="flex size-full h-full w-full items-center justify-center px-14">
                <HeadingChars
                  delayTrigger={(product.length - 1) * 0.1}
                  delayEnter={delay_trigger._05}
                >
                  <h3 className="text-center font-title text-40 font-normal uppercase text-txt-light-primary">
                    You’ll find more drinks on the menu
                  </h3>
                </HeadingChars>
              </div>
            </div>
          </Fade>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
