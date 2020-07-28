import * as React from 'react';
import {Route, MemoryRouter} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import {PrivateRoute} from './private-route';
import {AuthorizationStatus, AppRoute} from '../../const';

const routeTravelling = (userAuthStatus: AuthorizationStatus) => (
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
