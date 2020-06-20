import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const EMPTY_HANDLER = () => {};
const APARTMENTS = [
  {
    id: 0,
    type: `Apartment`,
    description: `description0`,
    rating: 0.1,
    price: 1,
    isPremium: true,
    isFavourite: true,
    photo: `img0.jpg`
  },
  {
    id: 1,
    type: `Private room`,
    description: `description1`,
    rating: 1,
    price: 2,
    isPremium: false,
    isFavourite: false,
    photo: `img1.jpg`
  }
];

describe(`<Main /> render suit`, () => {
  it(`<Main /> render apartment list case`, () => {
    const generatedTree = renderer.create(
        <Main
          apartmentList={APARTMENTS}
          onApartmentTitleClick={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
