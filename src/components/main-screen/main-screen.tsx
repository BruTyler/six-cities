import * as React from 'react';
import PropTypes from 'prop-types';

import CityList from '../city-list/city-list';
import Header from '../header/header';
import MainEmpty from '../main-empty/main-empty';
import MainOffers from '../main-offers/main-offers';

const MainScreen = (props) => {
  const {activeCity, cityList, apartmentList, onCityTitleClick, authInfo} = props;

  return <div className="page page--gray page--main">
    <Header authInfo={authInfo} />
    <main className={`page__main page__main--index${apartmentList.length === 0 ? ` page__main--index-empty` : ``}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CityList
          activeCity={activeCity}
          cityList={cityList}
          onCitySelect={onCityTitleClick}
        />
      </div>
      {apartmentList.length === 0 ?
        <MainEmpty
          detailMessage={`We could not find any property availbale at the moment in ${activeCity.id}`}
        />
        :
        <MainOffers
          activeCity={activeCity}
          cityList={cityList}
          apartmentList={apartmentList}
          onCityTitleClick={onCityTitleClick}
        />}
    </main>
  </div>;
};

MainScreen.propTypes = {
  activeCity: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onCityTitleClick: PropTypes.func.isRequired,
  authInfo: PropTypes.shape(),
};

export default MainScreen;