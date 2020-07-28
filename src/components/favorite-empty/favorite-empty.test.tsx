import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FavoriteEmpty from './favorite-empty';

describe(`<FavoriteEmpty /> render suit`, () => {
  it(`<FavoriteEmpty /> render special empty screen`, () => {
    const generatedTree = renderer.create(
        <FavoriteEmpty />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

