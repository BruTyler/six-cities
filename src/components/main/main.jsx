import React from 'react';
import PropTypes from 'prop-types';
import Apartment from './../apartment/apartment.jsx';

const Main = (props) => {
  const {apartmentList} = props;

  return <React.Fragment>
    <p>Предложения аренды:</p>
    {apartmentList.map((apartment) => <Apartment key={apartment} item={apartment} />)}
    <hr />
    <p>Всего предложений: {apartmentList.length}</p>
  </React.Fragment>;
};

Main.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Main;
