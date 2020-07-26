import * as React from 'react';
import * as renderer from 'react-test-renderer';
import OfflineScreen from './offline-screen';

describe(`<OfflineScreen /> render suit`, () => {
  it(`<OfflineScreen /> render special screen`, () => {
    const generatedTree = renderer.create(
        <OfflineScreen />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

