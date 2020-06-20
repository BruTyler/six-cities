import React from 'react';
import renderer from 'react-test-renderer';
import ApartmentCard from './apartment-card.jsx';

const APARTMENTNAME = `apart1`;
const CLICKHANDLER = () => {};

describe(`Apartment render suit`, () => {
  it(`Apartment render apartment item case`, () => {
    const generatedTree = renderer.create(
        <ApartmentCard
          item={APARTMENTNAME}
          onApartmentTitleClick={CLICKHANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

});
