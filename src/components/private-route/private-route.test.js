import React from 'react';
import {Route, MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {PrivateRoute} from './private-route.jsx';
import {AuthorizationStatus, AppRoute} from '../../const.js';

const routeTravelling = (userAuthStatus) => (
  <MemoryRouter initialEntries={[`/secret`]} initialIndex={0}>
    <Route exact
      path={AppRoute.AUTH}
      render={() => <div>login page</div>}
    />
    <PrivateRoute exact
      path="/secret"
      render={() => <div>private page</div>}
      authStatus={userAuthStatus}
    />
  </MemoryRouter>
);

describe(`<PrivateRoute /> render suit`, () => {
  it(`<PrivateRoute /> enables rendering private page for authenticated user`, () => {
    const generatedTree = renderer.create(
        routeTravelling(AuthorizationStatus.AUTH)
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`<PrivateRoute /> redirects non-authenticated user to login page`, () => {
    const generatedTree = renderer.create(
        routeTravelling(AuthorizationStatus.NO_AUTH)
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
