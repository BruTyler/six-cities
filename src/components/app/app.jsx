import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Router} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/application/application.js';
import {getCity, getApartmentList, getCities} from '../../reducer/data/selectors.js';
import MainScreen from './../main-screen/main-screen.jsx';
import Property from '../property/property.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import AuthScreen from '../auth-screen/auth-screen.jsx';
import {getAuthorizationStatus, getAuthInfo} from '../../reducer/user/selectors.js';
import {AuthorizationStatus, AppRoute} from '../../const.js';
import history from '../../history.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderScreen() {
    const {
      apartmentList, cityList, activeCity, handleChangeCity,
      authInfo, authStatus,
      activeItem: clickedProperty,
      onItemSelect: onApartmentTitleClick
    } = this.props;

    if (clickedProperty) {
      return <Property
        apartment={clickedProperty}
        neighboorApartmentList={apartmentList.filter((el) => el.id !== clickedProperty.id).slice(0, 3)}
        city={activeCity}
        onApartmentTitleClick={onApartmentTitleClick}
        authInfo={authInfo}
        authStatus={authStatus}
      />;
    }

    return <MainScreen
      activeCity={activeCity}
      cityList={cityList}
      apartmentList={apartmentList}
      onApartmentTitleClick={onApartmentTitleClick}
      onCityTitleClick={handleChangeCity}
      authInfo={authInfo}
      authStatus={authStatus}
    />;
  }

  render() {
    const {authInfo, authStatus, onLoginSubmit, activeCity} = this.props;

    return <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          {this._renderScreen()}
        </Route>
      </Switch>
      <Switch>
        <Route exact path={AppRoute.AUTH}>
          <AuthScreen
            authInfo={authInfo}
            authStatus={authStatus}
            onLoginSubmit={onLoginSubmit}
            activeCity={activeCity}
          />
        </Route>
      </Switch>
    </Router>;
  }
}

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeCity: PropTypes.shape().isRequired,
  handleChangeCity: PropTypes.func.isRequired,
  activeItem: PropTypes.shape(),
  onItemSelect: PropTypes.func.isRequired,
  authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  authInfo: PropTypes.shape(),
};

const mapStateToProps = (state) => {
  return {
    apartmentList: getApartmentList(state),
    cityList: getCities(state),
    activeCity: getCity(state),
    authStatus: getAuthorizationStatus(state),
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
export default connect(mapStateToProps, mapDispatchToProps)(withActiveItem(App));
