import React from 'react';
import PropTypes from 'prop-types';
import ApartmentList from '../apartment-list/apartment-list.jsx';

const Main = (props) => {
  const {apartmentList, onApartmentTitleClick} = props;

  return <React.Fragment>
    <p>{apartmentList.length} places to stay</p>
    <ApartmentList
      apartmentList={apartmentList}
      onApartmentTitleClick={onApartmentTitleClick}
    />
  </React.Fragment>;
};

Main.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired
};

export default Main;