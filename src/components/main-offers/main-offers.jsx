import React from 'react';
import PropTypes from 'prop-types';

import ApartmentList from '../apartment-list/apartment-list.jsx';
import Map from '../map/map.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const MainOffers = (props) => {
  const {activeCity, apartmentList, onApartmentTitleClick,
    activeItem: hoveredApartment,
    onItemSelect: onApartmentCardHover} = props;

  return <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{apartmentList.length} places to stay in {activeCity.title}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
              Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex="0">Popular</li>
            <li className="places__option" tabIndex="0">Price: low to high</li>
            <li className="places__option" tabIndex="0">Price: high to low</li>
            <li className="places__option" tabIndex="0">Top rated first</li>
          </ul>
        </form>
        <ApartmentList
          className="cities"
          apartmentList={apartmentList}
          onApartmentTitleClick={onApartmentTitleClick}
          onApartmentCardHover={onApartmentCardHover}
        />
      </section>
      <div className="cities__right-section">
        <Map
          className="cities__map"
          city={activeCity}
          activeApartment={hoveredApartment}
          apartmentList={apartmentList}
        />
      </div>
    </div>
  </div>;
};

MainOffers.propTypes = {
  activeCity: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired,
  activeItem: PropTypes.shape(),
  onItemSelect: PropTypes.func.isRequired,
};

export {MainOffers};
export default withActiveItem(MainOffers);
