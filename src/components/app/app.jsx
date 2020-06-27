import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer.js';
import Main from './../main/main.jsx';
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

  _renderMainScreen() {
    const {apartmentList, cityList, activeCity, onCityTitleClick} = this.props;
    const {clickedProperty} = this.state;

    if (clickedProperty) {
      return <Property
        property={clickedProperty}
      />;
    }

    return <Main
      city={activeCity}
      cityList={cityList}
      apartmentList={apartmentList}
      onApartmentTitleClick={this.handleApartmentTitleClick}
      onCityTitleClick={onCityTitleClick}
    />;
  }

  render() {
    const {apartmentList} = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderMainScreen()}
        </Route>
        <Route exact path="/dev-property">
          <Property
            property={apartmentList[0]}
          />
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

const mapStateToProps = (state) => ({
  apartmentList: state.apartmentList,
  cityList: state.cityList,
  activeCity: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onCityTitleClick(cityId) {
    dispatch(ActionCreator.changeCity(cityId));
    // this.forceUpdate();
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
