import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import AuthScreen from './auth-screen';
import AuthInfoMock from '../../mocks/authInfo';
import history from '../../history';
import {City, AuthInfo} from '../../types';

const AUTH_INFO: AuthInfo = AuthInfoMock;
const CITY: City = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1,
};

describe(`<AuthScreen /> render suit`, () => {
  it(`<AuthScreen /> render screen`, () => {
    const generatedTree = renderer.create(
        <Router history={history}>
          <AuthScreen
            onLoginSubmit={()=>null}
            authInfo={AUTH_INFO}
            activeCity={CITY}
          />
        </Router>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
