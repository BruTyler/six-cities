import React from 'react';
import Main from './../main/main.jsx';
import PropTypes from 'prop-types';

const onApartmentCardHover = () => {};

const App = (props) => {
  const {apartmentList} = props;

  return <Main
    apartmentList={apartmentList}
    onApartmentCardHover={onApartmentCardHover}
  />;
};

App.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default App;
