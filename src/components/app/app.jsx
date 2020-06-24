import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './../main/main.jsx';
import Property from '../property/property.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clickedProperty: null
    };

    this.handleApartmentTitleClick = this.handleApartmentTitleClick.bind(this);
  }

  handleApartmentTitleClick(prop) {
    this.setState({clickedProperty: prop});
  }

  _renderMainScreen() {
    const {apartmentList, cities} = this.props;
    const {clickedProperty} = this.state;

    if (clickedProperty) {
      return <Property
        property={clickedProperty}
      />;
    }

    return <Main
      city={cities[0]}
      apartmentList={apartmentList}
      onApartmentTitleClick={this.handleApartmentTitleClick}
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
  cities: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default App;
