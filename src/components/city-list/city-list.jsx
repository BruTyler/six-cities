import React from 'react';
import PropTypes from 'prop-types';

const CityList = ({cityList, activeCity, onCityTitleClick}) => {
  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cityList.map((item) => {
        return <li className="locations__item" key={`city-${item.id}`}>
          <a className={`locations__item-link tabs__item${item.id === activeCity.id ? ` tabs__item--active` : ``}`}
            href="#"
            onClick={() => onCityTitleClick(item.id)}>
            <span>{item.title}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;
};

CityList.propTypes = {
  activeCity: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onCityTitleClick: PropTypes.func.isRequired,
};

export default CityList;
