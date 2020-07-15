import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator, Operation} from '../../reducer.js';
import MainScreen from './../main-screen/main-screen.jsx';
import Property from '../property/property.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import OfflineScreen from '../offline-screen/offline-screen.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._init();
  }

  _init() {
    const {handleLoadCitiesWithApartments} = this.props;
    handleLoadCitiesWithApartments();
  }

  _renderScreen() {
    const {apartmentList, cityList, activeCity, onCityTitleClick,
      activeItem: clickedProperty,
      onItemSelect: onApartmentTitleClick
    } = this.props;

    if (cityList === undefined || cityList.length === 0) {
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
  handleLoadCitiesWithApartments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    apartmentList: state.filteredApartmentList,
    cityList: state.cityList,
    activeCity: state.city,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCityTitleClick(city) {
    dispatch(ActionCreator.changeCity(city.id));
  },
  handleLoadCitiesWithApartments() {
    dispatch(Operation.loadCitiesWithApartments());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(withActiveItem(App));
