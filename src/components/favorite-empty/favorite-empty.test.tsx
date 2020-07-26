import React from 'react';
import renderer from 'react-test-renderer';
import FavoriteEmpty from './favorite-empty.jsx';

describe(`<FavoriteEmpty /> render suit`, () => {
  it(`<FavoriteEmpty /> render special empty screen`, () => {
    const generatedTree = renderer.create(
        <FavoriteEmpty />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

