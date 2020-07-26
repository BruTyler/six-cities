import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import Header from './header.jsx';
import AuthInfoMock from '../../mocks/authInfo.js';
import history from '../../history.js';

describe(`<Header /> render suit`, () => {
  it(`<Header /> render case`, () => {
    const generatedTree = renderer.create(
        <Router history={history}>
          <Header authInfo={AuthInfoMock}/>
        </Router>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
