import * as React from 'react';
import {Route, Switch, Router} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/application/application';
import {getCity, getApartmentList, getCities} from '../../reducer/data/selectors';
import MainScreen from './../main-screen/main-screen';
import Property from '../property/property';
import {Operation as UserOperation} from '../../reducer/user/user';
import AuthScreen from '../auth-screen/auth-screen';
import {getAuthInfo} from '../../reducer/user/selectors';
import {AppRoute} from '../../const';
import history from '../../history';
import FavoriteScreen from '../favorite-screen/favorite-screen';
import PrivateRoute from '../private-route/private-route';
import {City, AuthInfo, AuthData, SingleApartment} from '../../types';

interface Props {
  apartmentList: Array<SingleApartment>;
  cityList: Array<City>;
  activeCity: City;
  handleChangeCity: (city: City) => void;
  handleLoginSubmit: (authData: AuthData) => Promise<void>;
  authInfo?: AuthInfo;
}

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {authInfo, handleLoginSubmit,
    apartmentList, cityList, activeCity, handleChangeCity
  } = props;

  return <Router history={history}>
    <Switch>
      <Route exact path={AppRoute.AUTH}>
        <AuthScreen
          authInfo={authInfo}
          onLoginSubmit={handleLoginSubmit}
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

const mapStateToProps = (state) => {
  return {
    apartmentList: getApartmentList(state),
    cityList: getCities(state),
    activeCity: getCity(state),
    authInfo: getAuthInfo(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleLoginSubmit(authData) {
    return dispatch(UserOperation.makeAuthorization(authData));
  },
  handleChangeCity(city) {
    dispatch(ActionCreator.changeCity(city.id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
