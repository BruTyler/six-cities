import React from 'react';
import renderer from 'react-test-renderer';
import OfflineScreen from './offline-screen.jsx';

describe(`<OfflineScreen /> render suit`, () => {
  it(`<OfflineScreen /> render special screen`, () => {
    const generatedTree = renderer.create(
        <OfflineScreen />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

