import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer.js';
import MainScreen from './../main-screen/main-screen.jsx';
import Property from '../property/property.jsx';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      clickedProperty: null
    };

    this.handleApartmentTitleClick = this.handleApartmentTitleClick.bind(this);
  }

  handleApartmentTitleClick(property) {
    this.setState({clickedProperty: property});
  }

  _renderScreen() {
    const {apartmentList, cityList, activeCity, onCityTitleClick} = this.props;
    const {clickedProperty} = this.state;

    if (clickedProperty) {
      return <Property
        apartment={clickedProperty}
        neighboorApartmentList={apartmentList.filter((el) => el.id !== clickedProperty.id).slice(0, 3)}
        city={activeCity}
        onApartmentTitleClick={this.handleApartmentTitleClick}
      />;
    }

    return <MainScreen
      activeCity={activeCity}
      cityList={cityList}
      apartmentList={apartmentList}
      onApartmentTitleClick={this.handleApartmentTitleClick}
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
    </BrowserRouter>;
  }
}

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeCity: PropTypes.shape().isRequired,
  onCityTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    apartmentList: state.apartmentList,
    cityList: state.cityList,
    activeCity: state.city,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCityTitleClick(city) {
    dispatch(ActionCreator.changeCity(city.id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
