import React from 'react';
import renderer from 'react-test-renderer';
import Apartment from './apartment.jsx';

const APARTMENTNAME = `apart1`;

describe(`Apartment render suit`, () => {
  it(`Apartment render apartment item case`, () => {
    const generatedTree = renderer.create(
        <Apartment
          item={APARTMENTNAME}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

});
