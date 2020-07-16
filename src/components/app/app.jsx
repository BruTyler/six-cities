import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/application/application.js';
import {getCity, getApartmentList, getCities} from '../../reducer/data/selectors.js';
import {getLoadingStatus} from '../../reducer/application/selectors.js';
import MainScreen from './../main-screen/main-screen.jsx';
import Property from '../property/property.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import OfflineScreen from '../offline-screen/offline-screen.jsx';
import {Operation} from '../../reducer/data/data.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this._init();
  }

  _init() {
    const {handleFetchingHotels, handleFinishLoading, isLoading} = this.props;
    handleFetchingHotels(() => handleFinishLoading(isLoading));
  }

  componentDidUpdate() {
    const {handleFirstCityLoad, cityList, handleFinishLoading, isLoading} = this.props;
    if (isLoading && cityList && cityList.length > 0) {
      handleFirstCityLoad(cityList[0]);
    }
    handleFinishLoading(isLoading);
  }

  _renderScreen() {
    const {apartmentList, cityList, activeCity, onCityTitleClick, isLoading,
      activeItem: clickedProperty,
      onItemSelect: onApartmentTitleClick
    } = this.props;

    if (activeCity === undefined || cityList === undefined || cityList.length === 0) {
      if (isLoading) {
        return null;
      }
      return <OfflineScreen />;
    }

    if (clickedProperty) {
      return <Property
        apartment={clickedProperty}
        neighboorApartmentList={apartmentList.filter((el) => el.id !== clickedProperty.id).slice(0, 3)}
        city={activeCity}
        onApartmentTitleClick={onApartmentTitleClick}
      />;
    }

    return <MainScreen
      activeCity={activeCity}
      cityList={cityList}
      apartmentList={apartmentList}
      onApartmentTitleClick={onApartmentTitleClick}
      onCityTitleClick={onCityTitleClick}
    />;
  }

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderScreen()}
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/offline">
          <OfflineScreen />
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeCity: PropTypes.shape(),
  onCityTitleClick: PropTypes.func.isRequired,
  activeItem: PropTypes.shape(),
  onItemSelect: PropTypes.func.isRequired,
  handleFirstCityLoad: PropTypes.func.isRequired,
  handleFetchingHotels: PropTypes.func.isRequired,
  handleFinishLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    apartmentList: getApartmentList(state),
    cityList: getCities(state),
    activeCity: getCity(state),
    isLoading: getLoadingStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCityTitleClick(city) {
    dispatch(ActionCreator.changeCity(city.id));
  },
  handleFirstCityLoad(city) {
    dispatch(ActionCreator.changeCity(city.id));
  },
  handleFetchingHotels(onErrorCatch) {
    dispatch(Operation.loadCitiesWithApartments())
      .catch(onErrorCatch);
  },
  handleFinishLoading(currentLoadingStatus) {
    if (currentLoadingStatus) {
      dispatch(ActionCreator.changeLoadingStatus(false));
    }
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(withActiveItem(App));
