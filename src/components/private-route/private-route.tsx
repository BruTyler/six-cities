import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

type Props = RouteProps & {
  authStatus: AuthorizationStatus;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<Props> = ({render, path, exact, authStatus}: Props) => (
  <Route
    path={path}
    exact={exact}
    render={() => {
      return (
        authStatus === AuthorizationStatus.AUTH
          ? render()
          : <Redirect to={AppRoute.AUTH} />
      );
    }}
  />
);

const mapStateToProps = (state) => ({
  authStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
