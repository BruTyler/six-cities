import React from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const CityList = (props) => {
  const {cityList, activeItem: activeCity, onItemSelect: onCityTitleClick} = props;

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cityList.map((item) => {
        return <li className="locations__item" key={`city-${item.id}`}>
          <a className={`locations__item-link tabs__item${item.id === activeCity.id ? ` tabs__item--active` : ``}`}
            href="#"
            onClick={() => onCityTitleClick(item)}>
            <span>{item.title}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;
};

CityList.propTypes = {
  activeItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export {CityList};
export default withActiveItem(CityList);
