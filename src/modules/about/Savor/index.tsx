import ImagePlaceholder from '@/components/ImagePlaceHolder';
import { delay_trigger } from '@/constants/delay';
import BoxMaskLeft from '@/interactive/BoxMask/Left';
import HeadingChars from '@/interactive/Heading/Chars';
import ImageParallax from '@/interactive/ImageParallax';
import Line from '@/interactive/Line';
import ParagraphLineFade from '@/interactive/Paragraph/Line/Fade';
import { cn } from '@/utils/uiHelper';

export default function Savor() {
  const DATA_SAVORS = [
    {
      title: 'Vietnamese Coffee:',
      description:
        'Experience the bold, rich taste of Vietnamese coffee, crafted with precision using traditional phin filters. Our signature blends, like Iced Milk Coffee and Iced Black Coffee, bring the iconic slow-drip magic to Manila, perfect for coffee lovers seeking an authentic kick.',
      image: '/images/image_savor_1.jpg',
      class: 'col-start-1 col-end-7 max-w-[44rem] row-start-2 row-end-3',
      image_class: 'aspect-[704/440]',
    },
    {
      title: 'Bánh mì',
      description:
        'Savor our artisanal Banh Mi, a Vietnamese street food gem featuring crispy bread stuffed with juicy meats, fresh veggies, and tangy sauces. From Pork Banh Mi to Fried Egg Banh Mi , each bite offers a delicious fusion, crafted to delight Manila’s food explorers.',
      image: '/images/image_savor_2.jpg',
      class: 'col-start-7 col-end-11 max-w-[20.875rem] row-start-2 row-end-3 pl-6',
      image_class: 'aspect-square w-[12.5rem]',
    },
    {
      title: 'Sticky rice',
      description:
        'Enjoy our sticky rice dishes, a comforting Vietnamese delight topped with eggs, pork, or mung beans. Xoi dishes like Mixed Sticky Rice and Gac Sticky Rice offer a unique texture and taste, making them a must-try for a hearty meal in Manila.',
      class: 'col-start-10 -col-end-1  w-[25.125rem] ml-6 row-start-1 row-end-3',
      image: '/images/image_savor_3.jpg',
      image_class: 'aspect-[452/427] w-[12.5rem]',
    },
  ];
  return (
    <section className="bg-bg-sf py-20">
      <div className="container grid grid-cols-12">
        <HeadingChars>
          <h2 className="col-start-1 col-end-6 row-start-1 row-end-2 mb-[7.5rem] max-w-[35rem] font-title text-40 font-medium uppercase text-txt-dark-primary">
            Savor the Taste of Vietnam: Coffee, Banh Mi, and Sticky Rice
          </h2>
        </HeadingChars>
        <div className="col-start-6 col-end-8 row-start-1 row-end-3 -my-20 mx-auto min-h-full">
          <Line direction="left" color="dark-strong" />
        </div>
        <div className="col-start-9 col-end-11 row-start-1 row-end-3 -my-20 mx-auto min-h-full">
          <Line direction="left" color="dark-strong" />
        </div>
        {DATA_SAVORS.map((item, index) => (
          <div key={index} className={cn(item.class)}>
            <div className="flex flex-col">
              <HeadingChars delayTrigger={delay_trigger._15 + index * 0.15}>
                <h3 className="mb-5 font-title text-24 font-medium text-txt-dark-primary">
                  {item.title}
                </h3>
              </HeadingChars>
              <ParagraphLineFade delayTrigger={delay_trigger._2 + index * 0.15}>
                <div className="mb-8 text-16 text-txt-dark-secondary">{item.description}</div>
              </ParagraphLineFade>
              <div className={cn('rouned-12 overflow-hidden', item.image_class)}>
                <BoxMaskLeft
                  delayTrigger={delay_trigger._25 + index * 0.15}
                  className="h-full w-full overflow-hidden rounded-12"
                >
                  <div>
                    <ImageParallax>
                      <ImagePlaceholder
                        src={item.image}
                        alt={item.title}
                        width={900}
                        height={900}
                        className="aspect-[452/427] h-auto w-full rounded-12"
                      />
                    </ImageParallax>
                  </div>
                </BoxMaskLeft>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
