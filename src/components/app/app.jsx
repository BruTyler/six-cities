import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './../main/main.jsx';
import Property from '../property/property.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleApartmentTitleClick = this.handleApartmentTitleClick.bind(this);
  }

  handleApartmentTitleClick() {
    // TODO доделать метод
  }

  _renderMainScreen() {
    const {apartmentList} = this.props;

    return <Main
      apartmentList={apartmentList}
      onApartmentTitleClick={this.handleApartmentTitleClick}
    />;
  }

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderMainScreen()}
        </Route>
        <Route exact path="/dev-property">
          <Property/>
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default App;
