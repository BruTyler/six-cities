import React from 'react';
import renderer from 'react-test-renderer';
import MainEmpty from './main-empty.jsx';

const CITY = {
  title: `C`,
};

describe(`<MainEmpty /> render suit`, () => {
  it(`<MainEmpty /> render special empty screen`, () => {
    const generatedTree = renderer.create(
        <MainEmpty
          detailMessage={`We could not find any property availbale at the moment in ${CITY.title}`}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

