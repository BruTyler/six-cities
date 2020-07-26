import * as React from 'react';
import PropTypes from 'prop-types';

import ApartmentList from '../apartment-list/apartment-list';
import Map from '../map/map';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import PlaceSorter from '../place-sorter/place-sorter';
import {ApartmentEnvironment, MapEnvironment} from '../../const';

const MainOffers = (props) => {
  const {activeCity, apartmentList,
    activeItem: hoveredApartment,
    onItemSelect: onApartmentCardHover} = props;

  return <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{apartmentList.length} places to stay in {activeCity.id}</b>
        <PlaceSorter activeItem={false}/>
        <ApartmentList
          parentBox={ApartmentEnvironment.MAIN_WINDOW}
          apartmentList={apartmentList}
          onApartmentCardHover={onApartmentCardHover}
        />
      </section>
      <div className="cities__right-section">
        <Map
          parentBox={MapEnvironment.MAIN_WINDOW}
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
    id: PropTypes.string.isRequired,
  }).isRequired,
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeItem: PropTypes.shape(),
  onItemSelect: PropTypes.func.isRequired,
};

export {MainOffers};
export default withActiveItem(MainOffers);
