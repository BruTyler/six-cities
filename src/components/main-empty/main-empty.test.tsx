import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MainEmpty from './main-empty';

const CITY = {
  id: `C`,
};

describe(`<MainEmpty /> render suit`, () => {
  it(`<MainEmpty /> render special empty screen`, () => {
    const generatedTree = renderer.create(
        <MainEmpty
          detailMessage={`We could not find any property availbale at the moment in ${CITY.id}`}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
