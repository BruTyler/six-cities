import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Router} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/application/application.js';
import {getCity, getApartmentList, getCities} from '../../reducer/data/selectors.js';
import MainScreen from './../main-screen/main-screen.jsx';
import Property from '../property/property.jsx';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import AuthScreen from '../auth-screen/auth-screen.jsx';
import {getAuthInfo} from '../../reducer/user/selectors.js';
import {AppRoute} from '../../const.js';
import history from '../../history.js';
import FavoriteScreen from '../favorite-screen/favorite-screen.jsx';
import PrivateRoute from '../private-route/private-route.jsx';

const App = (props) => {
  const {authInfo, onLoginSubmit,
    apartmentList, cityList, activeCity, handleChangeCity
  } = props;

  return <Router history={history}>
    <Switch>
      <Route exact path={AppRoute.AUTH}>
        <AuthScreen
          authInfo={authInfo}
          onLoginSubmit={onLoginSubmit}
          activeCity={activeCity}
        />
      </Route>
      <PrivateRoute exact
        path={AppRoute.FAVORITES}
        render={() => <FavoriteScreen />}
      />
      <Route exact
        path={AppRoute.PROPERTY_WITH_ID}
        render={({match}) =>
          <Property
            id={Number(match.params.id)}
          />}
      />
      <Route path={AppRoute.ROOT}>
        <MainScreen
          activeCity={activeCity}
          cityList={cityList}
          apartmentList={apartmentList}
          onCityTitleClick={handleChangeCity}
          authInfo={authInfo}
        />;
      </Route>
    </Switch>
  </Router>;
};

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeCity: PropTypes.shape().isRequired,
  handleChangeCity: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  authInfo: PropTypes.shape(),
};

const mapStateToProps = (state) => {
  return {
    apartmentList: getApartmentList(state),
    cityList: getCities(state),
    activeCity: getCity(state),
    authInfo: getAuthInfo(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoginSubmit(authData) {
    return dispatch(UserOperation.makeAuthorization(authData));
  },
  handleChangeCity(city) {
    dispatch(ActionCreator.changeCity(city.id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
