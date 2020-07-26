import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import AuthScreen from './auth-screen';
import AuthInfoMock from '../../mocks/authInfo';
import history from '../../history';

describe(`<AuthScreen /> render suit`, () => {
  it(`<AuthScreen /> render screen`, () => {
    const generatedTree = renderer.create(
        <Router history={history}>
          <AuthScreen
            onLoginSubmit={()=>{}}
            authInfo={AuthInfoMock}
            activeCity={{id: `Amsterdam`}}
          />
        </Router>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
