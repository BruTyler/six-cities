import React from 'react';
import renderer from 'react-test-renderer';
import Property from './property.jsx';

const SINGLE_APARTMENT = {
  id: 1,
  type: `Private room`,
  description: `description1`,
  rating: 1,
  price: 2,
  isPremium: false,
  isFavourite: false,
  photoSet: [
    `img1.jpg`,
    `img2.jpg`,
  ],
  bedrooms: 3,
  adultsMax: 4,
  goods: [`WiFi`, `TV`],
  host: {
    avatar: `ava.jpg`,
    name: `name`,
    isSuper: true,
  },
};

describe(`<Property /> render suit`, () => {
  it(`<Property /> render single apartment`, () => {
    const generatedTree = renderer.create(
        <Property
          apartment={SINGLE_APARTMENT}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
