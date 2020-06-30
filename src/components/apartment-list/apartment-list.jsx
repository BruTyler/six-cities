import React from 'react';
import PropTypes from 'prop-types';
import ApartmentCard from '../apartment-card/apartment-card.jsx';

const ApartmentList = (props) => {
  const {apartmentList, onApartmentTitleClick, onApartmentCardHover} = props;

  return <div className="cities__places-list places__list tabs__content">
    {apartmentList.map((apartment) =>
      <ApartmentCard
        key={apartment.id}
        apartment={apartment}
        onApartmentCardHover={onApartmentCardHover}
        onApartmentTitleClick={onApartmentTitleClick}
      />)
    }
  </div>;
};

ApartmentList.propTypes = {
  apartmentList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
  ).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired,
  onApartmentCardHover: PropTypes.func,
};

export default ApartmentList;
