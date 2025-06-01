'use client';

import CollectionMenu from '@/components/CollectionMenu';
import HeadingContent from '@/components/HeadingContent';
import useColorChange from '@/components/SectionBgChange/useColorChange';
import React, { useRef } from 'react';

const product_drink = [
  {
    name: 'black coffee',
    price: 150,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'Coffee',
  },
  {
    name: 'EGG coffee',
    price: 225,
    decscription: 'A unique creation blending rich egg cream with strong coffee.',
    image: '/images/coffe.jpg',
    category: 'Coffee',
  },
  {
    name: 'peanut butter coffee',
    price: 225,
    decscription: 'Our signature coffee served cold over ice. Refreshing and bold.',
    image: '/images/coffe.jpg',
    category: 'Coffee',
  },
  {
    name: 'salted coffee',
    price: 225,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'Coffee',
  },
  {
    name: 'black coffee',
    price: 150,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'Coffee',
  },
  {
    name: 'black coffee',
    price: 150,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'Coffee',
  },
  {
    name: 'EGG coffee',
    price: 225,
    decscription: 'A unique creation blending rich egg cream with strong coffee.',
    image: '/images/coffe.jpg',
    category: 'non coffee',
  },
  {
    name: 'peanut butter coffee',
    price: 225,
    decscription: 'Our signature coffee served cold over ice. Refreshing and bold.',
    image: '/images/coffe.jpg',
    category: 'non coffee',
  },
  {
    name: 'salted coffee',
    price: 225,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'non coffee',
  },
  {
    name: 'black coffee',
    price: 150,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'non coffee',
  },
  {
    name: 'peanut butter coffee',
    price: 225,
    decscription: 'Our signature coffee served cold over ice. Refreshing and bold.',
    image: '/images/coffe.jpg',
    category: 'tea',
  },
  {
    name: 'salted coffee',
    price: 225,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'tea',
  },
  {
    name: 'black coffee',
    price: 150,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'matcha',
  },
  {
    name: 'peanut butter coffee',
    price: 225,
    decscription: 'Our signature coffee served cold over ice. Refreshing and bold.',
    image: '/images/coffe.jpg',
    category: 'matcha',
  },
  {
    name: 'salted coffee',
    price: 225,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'matcha',
  },
  {
    name: 'black coffee',
    price: 150,
    decscription: 'Strong, rich coffee slowly dripped and served with sweet condensed milk.',
    image: '/images/coffe.jpg',
    category: 'matcha',
  },
];
const product_food = [
  {
    name: 'special bánh mì',
    price: 225,
    decscription: 'With pork ham pork roll floss vegetables',
    image: '/images/banhmi.jpg',
    category: 'bánh mì',
  },
  {
    name: 'chicken banh mi',
    price: 265,
    decscription: 'With pork ham pork roll floss vegetables',
    image: '/images/banhmi.jpg',
    category: 'bánh mì',
  },
  {
    name: 'fish cake bánh mì',
    price: 225,
    decscription: 'With pork ham pork roll floss vegetables',
    image: '/images/banhmi.jpg',
    category: 'bánh mì',
  },
  {
    name: 'chicken banh mi',
    price: 265,
    decscription: 'With pork ham pork roll floss vegetables',
    image: '/images/banhmi.jpg',
    category: 'sticky rice',
  },
  {
    name: 'fish cake bánh mì',
    price: 225,
    decscription: 'With pork ham pork roll floss vegetables',
    image: '/images/banhmi.jpg',
    category: 'sticky rice',
  },
];
export default function OurMenu() {
  const outMenuRef = useRef<HTMLDivElement>(null);
  useColorChange(outMenuRef);
  return (
    <div className="py-[6.75rem]" data-theme="light" ref={outMenuRef}>
      <div className="container">
        <div className="grid grid-cols-12">
          <HeadingContent
            type="light"
            className="col-start-3 -col-end-3 mx-auto mb-20 text-center"
            label="Our Menus"
            title="Coffee, banh mi, sticky rice"
          />
          <div className="col-span-full flex flex-col gap-[6.25rem]">
            <CollectionMenu
              key={'collection-1'}
              title="Vietnamese Coffee & Beverages"
              description="Our coffee beans are carefully selected and brewed using traditional Vietnamese methods to deliver an authentic taste experience."
              product={product_drink}
            />

            <CollectionMenu
              key={'collection-2'}
              title="Bánh Mì & Sticky Rice"
              description="Ideal for brunch or merienda, don’t miss Vietlasa’s savory sticky rice and crusty bánh mì!"
              product={product_food}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
