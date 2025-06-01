import React from 'react';
import ImagePlaceholder from '../ImagePlaceHolder';
export type TProduct = {
  name: string;
  price: number;
  decscription: string;
  image: string;
  category: string;
  className?: string;
};
export default function ProductItem(props: TProduct) {
  const { name, price, decscription, image, category, className } = props;
  return (
    <div className={`w-full ${className} cursor-pointer`}>
      <div className="flex flex-col">
        <div className="mb-5 aspect-[377/430] overflow-hidden rounded-12">
          <ImagePlaceholder
            src={image}
            alt={name}
            className="h-full w-full"
            height={860}
            width={655}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-title text-24 font-medium text-txt-light-primary">{name}</h3>
          <div className="line-clamp-2 min-h-12 text-ellipsis text-16 font-light text-txt-light-secondary">
            {decscription}
          </div>
          <div className="font-title text-20 font-normal text-txt-light-primary">₱ {price}</div>
        </div>
      </div>
    </div>
  );
}
