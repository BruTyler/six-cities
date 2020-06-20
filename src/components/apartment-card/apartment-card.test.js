import React from 'react';
import renderer from 'react-test-renderer';
import ApartmentCard from './apartment-card.jsx';

const EMPTY_HANDLER = () => {};
const SINGLE_APARTMENT = {
  id: 1,
  type: `Private room`,
  description: `description1`,
  rating: 1,
  price: 2,
  isPremium: false,
  isFavourite: false,
  photo: `img1.jpg`
};

describe(`<ApartmentCard /> render suit`, () => {
  it(`<ApartmentCard /> render single apartment`, () => {
    const generatedTree = renderer.create(
        <ApartmentCard
          apartment={SINGLE_APARTMENT}
          onApartmentCardHover={EMPTY_HANDLER}
          onApartmentTitleClick={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
