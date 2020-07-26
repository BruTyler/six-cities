import * as React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../reducer/user/selectors';


const PrivateRoute = ({render, path, exact, authStatus}) => (
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

PrivateRoute.propTypes = {
  authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)),
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
