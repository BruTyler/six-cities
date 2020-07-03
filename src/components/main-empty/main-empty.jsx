import React from 'react';
import PropTypes from 'prop-types';

import CityList from '../city-list/city-list.jsx';
import Header from '../header/header.jsx';

const MainEmpty = ({activeCity, cityList, onCityTitleClick}) => {
  return <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CityList
          activeItem={activeCity}
          cityList={cityList}
          onItemSelect={onCityTitleClick}
        />
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property availbale at the moment in {activeCity.title}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  </div>;
};

MainEmpty.propTypes = {
  activeCity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onCityTitleClick: PropTypes.func.isRequired,
};

export default MainEmpty;
