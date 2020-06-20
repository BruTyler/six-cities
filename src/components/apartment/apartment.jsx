import React from 'react';
import PropTypes from 'prop-types';

const Apartment = (props) => {
  const {item, onApartmentTitleClick} = props;

  return <div>
    <img src='img/no-places.png' width='50' height='40'/>
    <a href='#' className='apartment__title' onClick={onApartmentTitleClick}>{item}</a>
  </div>;
};

Apartment.propTypes = {
  item: PropTypes.string.isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired
};

export default Apartment;
