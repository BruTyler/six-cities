import React from 'react';
import renderer from 'react-test-renderer';
import AuthScreen from './auth-screen.jsx';
import {AuthorizationStatus} from '../../const.js';

describe(`<AuthScreen /> render suit`, () => {
  it(`<AuthScreen /> render screen`, () => {
    const generatedTree = renderer.create(
        <AuthScreen
          authStatus={AuthorizationStatus.NO_AUTH}
          onLoginSubmit={()=>{}}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
