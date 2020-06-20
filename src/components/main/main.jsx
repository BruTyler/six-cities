import React from 'react';
import PropTypes from 'prop-types';
import ApartmentList from '../apartment-list/apartment-list.jsx';

const Main = (props) => {
  const {apartmentList, onApartmentTitleClick} = props;

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{apartmentList.length} places to stay </b>
    <ApartmentList
      apartmentList={apartmentList}
      onApartmentTitleClick={onApartmentTitleClick}
    />
  </section>;
};

Main.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired
};

export default Main;
