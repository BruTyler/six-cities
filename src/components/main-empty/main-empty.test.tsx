import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MainEmpty from './main-empty';

describe(`<MainEmpty /> render suit`, () => {
  it(`<MainEmpty /> render special empty screen`, () => {
    const generatedTree = renderer.create(
        <MainEmpty
          detailMessage={`We could not find any property availbale at the moment in C`}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

