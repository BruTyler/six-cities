import * as React from 'react';
import ApartmentList from '../apartment-list/apartment-list';
import Map from '../map/map';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import PlaceSorter from '../place-sorter/place-sorter';
import {ApartmentEnvironment, MapEnvironment} from '../../const';
import {City, SingleApartment} from '../../types';

interface Props {
  activeCity: City;
  apartmentList: Array<SingleApartment>;
  activeItem?: SingleApartment;
  onItemSelect: (apartment: SingleApartment) => void;
}

const MainOffers: React.FunctionComponent<Props> = (props: Props) => {
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

export {MainOffers};
export default withActiveItem(MainOffers);
