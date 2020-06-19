import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const APARTMENTLIST = [`apart1`, `apart2`];
const EMPTYAPARTMENTLIST = [];

describe(`App render suit`, () => {
  it(`App render apartment list`, () => {
    const generatedTree = renderer.create(
        <App
          apartmentList={APARTMENTLIST}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`App render empty apartment list`, () => {
    const generatedTree = renderer.create(
        <App apartmentList = {EMPTYAPARTMENTLIST}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
