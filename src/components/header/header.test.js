import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';
import AuthInfoMock from '../../mocks/authInfo.js';

describe(`<Header /> render suit`, () => {
  it(`<Header /> render case`, () => {
    const generatedTree = renderer.create(
        <Header authInfo={AuthInfoMock}/>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
