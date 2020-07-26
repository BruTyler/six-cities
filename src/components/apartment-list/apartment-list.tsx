import * as React from 'react';
import PropTypes from 'prop-types';
import ApartmentCard from '../apartment-card/apartment-card';
import {ApartmentEnvironment} from '../../const';

const ApartmentList = (props) => {
  const {parentBox, apartmentList, onApartmentCardHover} = props;

  return <div className={`${parentBox}__places-list ${parentBox}__list places__list tabs__content`}>
    {apartmentList.map((apartment) =>
      <ApartmentCard
        key={apartment.id}
        parentBox={parentBox}
        apartment={apartment}
        onApartmentCardHover={onApartmentCardHover}
      />)
    }
  </div>;
};

ApartmentList.propTypes = {
  parentBox: PropTypes.oneOf(Object.values(ApartmentEnvironment)).isRequired,
  apartmentList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
  ).isRequired,
  onApartmentCardHover: PropTypes.func,
};

export default ApartmentList;
