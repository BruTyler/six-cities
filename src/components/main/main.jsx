import React from 'react';
import PropTypes from 'prop-types';
import Apartment from './../apartment/apartment.jsx';

const Main = (props) => {
  const {apartmentList, onApartmentTitleClick} = props;

  return <React.Fragment>
    <p>Предложения аренды:</p>
    {apartmentList.map((apartment) =>
      <Apartment
        key={apartment}
        item={apartment}
        onApartmentTitleClick={onApartmentTitleClick}
      />)
    }
    <hr />
    <p>Всего предложений: {apartmentList.length}</p>
  </React.Fragment>;
};

Main.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired
};

export default Main;
