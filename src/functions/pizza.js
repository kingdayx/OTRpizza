import seedrandom from 'seedrandom'
import React from 'react'

export function generatePizzaImage(dna) {
  const rng = seedrandom(dna)
  if (!dna) {
    return []
  } else {
    return [
      {
        src: '/images/cheeses/cheese-1.png',
        name: 'cheese-1',
      },
      {
        src: '/images/cheeses/cheese-2.png',
        name: 'cheese-2',
      },
      {
        src: '/images/cheeses/cheese-3.png',
        name: 'cheese-3',
      },
      {
        src: '/images/cheeses/cheese-4.png',
        name: 'cheese-4',
      },
      {
        src: '/images/cheeses/cheese-5.png',
        name: 'cheese-5',
      },
      {
        src: '/images/cheeses/cheese-6.png',
        name: 'cheese-6',
      },
      {
        src: '/images/cheeses/cheese-7.png',
        name: 'cheese-7',
      },
      {
        src: '/images/cheeses/cheese-8.png',
        name: 'cheese-8',
      },
      {
        src: '/images/cheeses/cheese-9.png',
        name: 'cheese-9',
      },
      {
        src: '/images/cheeses/cheese-10.png',
        name: 'cheese-10',
      },
      {
        src: '/images/meats/meat-1.png',
        name: 'meat-1',
      },
      {
        src: '/images/meats/meat-2.png',
        name: 'meat-2',
      },
      {
        src: '/images/meats/meat-3.png',
        name: 'meat-3',
      },
      {
        src: '/images/meats/meat-4.png',
        name: 'meat-4',
      },
      {
        src: '/images/meats/meat-5.png',
        name: 'meat-5',
      },
      {
        src: '/images/meats/meat-6.png',
        name: 'meat-6',
      },
      {
        src: '/images/meats/meat-7.png',
        name: 'meat-7',
      },
      {
        src: '/images/meats/meat-8.png',
        name: 'meat-8',
      },
      {
        src: '/images/meats/meat-9.png',
        name: 'meat-9',
      },
      {
        src: '/images/meats/meat-10.png',
        name: 'meat-10',
      },
      {
        src: '/images/meats/meat-11.png',
        name: 'meat-11',
      },
      {
        src: '/images/meats/meat-12.png',
        name: 'meat-12',
      },
      {
        src: '/images/meats/meat-13.png',
        name: 'meat-13',
      },
      {
        src: '/images/meats/meat-14.png',
        name: 'meat-14',
      },
      {
        src: '/images/meats/meat-15.png',
        name: 'meat-15',
      },
      {
        src: '/images/meats/meat-16.png',
        name: 'meat-16',
      },
      {
        src: '/images/meats/meat-17.png',
        name: 'meat-17',
      },
      {
        src: '/images/meats/meat-18.png',
        name: 'cheese-18',
      },
      {
        src: '/images/spices/spice-1.png',
        name: 'spice-1',
      },
      {
        src: '/images/spices/spice-2.png',
        name: 'spice-2',
      },
      {
        src: '/images/spices/spice-3.png',
        name: 'spice-3',
      },
      {
        src: '/images/spices/spice-4.png',
        name: 'spice-4',
      },
      {
        src: '/images/spices/spice-5.png',
        name: 'spice-5',
      },
      {
        src: '/images/spices/spice-6.png',
        name: 'spice-6',
      },
      {
        src: '/images/spices/spice-7.png',
        name: 'spice-7',
      },
      {
        src: '/images/veggies/veggie-1.png',
        name: 'veggie-1',
      },
      {
        src: '/images/veggies/veggie-2.png',
        name: 'veggie-2',
      },
      {
        src: '/images/veggies/veggie-3.png',
        name: 'veggie-3',
      },
      {
        src: '/images/veggies/veggie-4.png',
        name: 'veggie-4',
      },
      {
        src: '/images/veggies/veggie-5.png',
        name: 'veggie-5',
      },
      {
        src: '/images/veggies/veggie-6.png',
        name: 'veggie-6',
      },
      {
        src: '/images/veggies/veggie-7.png',
        name: 'veggie-7',
      },
      {
        src: '/images/veggies/veggie-8.png',
        name: 'veggie-8',
      },
      {
        src: '/images/veggies/veggie-9.png',
        name: 'veggie-9',
      },
      {
        src: '/images/veggies/veggie-10.png',
        name: 'veggie-10',
      },
      {
        src: '/images/veggies/veggie-11.png',
        name: 'veggie-11',
      },
      {
        src: '/images/veggies/veggie-12.png',
        name: 'veggie-12',
      },
      {
        src: '/images/veggies/veggie-13.png',
        name: 'veggie-13',
      },
      {
        src: '/images/veggies/veggie-14.png',
        name: 'veggie-14',
      },
      {
        src: '/images/veggies/veggie-15.png',
        name: 'veggie-15',
      },
      {
        src: '/images/veggies/veggie-16.png',
        name: 'veggie-16',
      },
      {
        src: '/images/veggies/veggie-17.png',
        name: 'veggie-17',
      },
      {
        src: '/images/veggies/veggie-18.png',
        name: 'veggie-18',
      },
      {
        src: '/images/veggies/veggie-19.png',
        name: 'veggie-19',
      },
      {
        src: '/images/veggies/veggie-20.png',
        name: 'veggie-20',
      },
      {
        src: '/images/veggies/veggie-21.png',
        name: 'veggie-21',
      },
      {
        src: '/images/veggies/veggie-22.png',
        name: 'veggie-22',
      },
    ]
      .filter(() => rng() > 0.5)
      .map((image, index) => (
        <img key={index} src={image.src} alt={image.name} />
      ))
  }
}
