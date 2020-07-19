import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import AuthScreen from './auth-screen.jsx';
import {AuthorizationStatus} from '../../const.js';
import AuthInfoMock from '../../mocks/authInfo.js';
import history from '../../history.js';

describe(`<AuthScreen /> render suit`, () => {
  it(`<AuthScreen /> render screen`, () => {
    const generatedTree = renderer.create(
        <Router history={history}>
          <AuthScreen
            authStatus={AuthorizationStatus.NO_AUTH}
            onLoginSubmit={()=>{}}
            authInfo={AuthInfoMock}
          />
        </Router>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
