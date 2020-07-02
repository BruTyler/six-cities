import React from 'react';
import PropTypes from 'prop-types';
import ApartmentCard from '../apartment-card/apartment-card.jsx';

const ApartmentList = (props) => {
  const {className, apartmentList, onApartmentTitleClick, onApartmentCardHover} = props;

  return <div className={`${className}__places-list ${className}__list places__list tabs__content`}>
    {apartmentList.map((apartment) =>
      <ApartmentCard
        key={apartment.id}
        className={className}
        apartment={apartment}
        onApartmentCardHover={onApartmentCardHover}
        onApartmentTitleClick={onApartmentTitleClick}
      />)
    }
  </div>;
};

ApartmentList.propTypes = {
  className: PropTypes.string.isRequired,
  apartmentList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
  ).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired,
  onApartmentCardHover: PropTypes.func,
};

export default ApartmentList;
