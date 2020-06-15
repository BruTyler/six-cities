import React from 'react';
import PropTypes from 'prop-types';

const Apartment = (props) => {
  const {item} = props;

  return <div>
    <img src='img/no-places.png' width='50' height='40'/>
    <span>{item}</span>
  </div>;
};

Apartment.propTypes = {
  item: PropTypes.string.isRequired
};

export default Apartment;
