import React from 'react';
import Main from './../main/main.jsx';
import PropTypes from 'prop-types';

const apartmentClickHandler = () => {};

const App = (props) => {
  const {apartmentList} = props;

  return <Main
    apartmentList={apartmentList}
    onApartmentTitleClick={apartmentClickHandler}
  />;
};

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
