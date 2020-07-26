import * as React from 'react';
import PropTypes from 'prop-types';

const CityList = (props) => {
  const {cityList, activeCity, onCitySelect} = props;

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cityList.map((item) => {
        return <li className="locations__item" key={`city-${item.id}`}>
          <a className={`locations__item-link tabs__item${item.id === activeCity.id ? ` tabs__item--active` : ``}`}
            href="#"
            onClick={() => onCitySelect(item)}>
            <span>{item.id}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;
};

CityList.propTypes = {
  activeCity: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onCitySelect: PropTypes.func.isRequired,
};

export default CityList;
