import React from 'react';
import PropTypes from 'prop-types';

import CityList from '../city-list/city-list.jsx';
import Header from '../header/header.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import MainOffers from '../main-offers/main-offers.jsx';

const MainScreen = (props) => {
  const {activeCity, cityList, apartmentList, onApartmentTitleClick, onCityTitleClick} = props;

  return <div className="page page--gray page--main">
    <Header />
    <main className={`page__main page__main--index${apartmentList.length === 0 ? ` page__main--index-empty` : ``}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CityList
          activeItem={activeCity}
          cityList={cityList}
          onItemSelect={onCityTitleClick}
        />
      </div>
      {apartmentList.length === 0 ?
        <MainEmpty
          detailMessage={`We could not find any property availbale at the moment in ${activeCity.title}`}
        />
        :
        <MainOffers
          activeCity={activeCity}
          cityList={cityList}
          apartmentList={apartmentList}
          onApartmentTitleClick={onApartmentTitleClick}
          onCityTitleClick={onCityTitleClick}
        />}
    </main>
  </div>;
};

MainScreen.propTypes = {
  activeCity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired,
  onCityTitleClick: PropTypes.func.isRequired,
};

export default MainScreen;
