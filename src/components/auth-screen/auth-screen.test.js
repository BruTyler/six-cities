import React from 'react';
import renderer from 'react-test-renderer';
import AuthScreen from './auth-screen.jsx';
import {AuthorizationStatus} from '../../const.js';
import AuthInfoMock from '../../mocks/authInfo.js';

describe(`<AuthScreen /> render suit`, () => {
  it(`<AuthScreen /> render screen`, () => {
    const generatedTree = renderer.create(
        <AuthScreen
          authStatus={AuthorizationStatus.NO_AUTH}
          onLoginSubmit={()=>{}}
          authInfo={AuthInfoMock}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
