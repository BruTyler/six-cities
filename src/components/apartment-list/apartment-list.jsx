import React from 'react';
import PropTypes from 'prop-types';
import ApartmentCard from '../apartment-card/apartment-card.jsx';

const ApartmentList = (props) => {
  const {apartmentList, onApartmentTitleClick} = props;

  return <React.Fragment>
    {apartmentList.map((apartment) =>
      <ApartmentCard
        key={apartment}
        item={apartment}
        onApartmentTitleClick={onApartmentTitleClick}
      />)
    }
  </React.Fragment>;
};

ApartmentList.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired
};

export default ApartmentList;
