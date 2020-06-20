import React from 'react';
import renderer from 'react-test-renderer';
import Apartment from './apartment.jsx';

const APARTMENTNAME = `apart1`;
const CLICKHANDLER = () => {};

describe(`Apartment render suit`, () => {
  it(`Apartment render apartment item case`, () => {
    const generatedTree = renderer.create(
        <Apartment
          item={APARTMENTNAME}
          onApartmentTitleClick={CLICKHANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

});
