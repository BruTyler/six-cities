import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

describe(`<Header /> render suit`, () => {
  it(`<Header /> render case`, () => {
    const generatedTree = renderer.create(
        <Header/>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
