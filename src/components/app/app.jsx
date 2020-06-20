import React from 'react';
import Main from './../main/main.jsx';
import PropTypes from 'prop-types';

const handleApartmentTitleClick = () => {};

const App = (props) => {
  const {apartmentList} = props;

  return <Main
    apartmentList={apartmentList}
    onApartmentTitleClick={handleApartmentTitleClick}
  />;
};

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default App;
