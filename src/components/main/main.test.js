import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const APARTMENTLIST = [`apart1`, `apart2`];
const CLICKHANDLER = () => {};

describe(`Main render suit`, () => {
  it(`Main render apartment list case`, () => {
    const generatedTree = renderer.create(
        <Main
          apartmentList={APARTMENTLIST}
          onApartmentTitleClick={CLICKHANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
