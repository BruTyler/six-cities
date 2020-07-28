import * as React from 'react';
import ApartmentCard from '../apartment-card/apartment-card';
import history from '../../history';
import {AppRoute, ApartmentEnvironment} from '../../const';
import {SingleApartment, City} from '../../types';

interface Props {
  favoriteApartments: Array<SingleApartment>;
  favoriteCities: Array<City>;
  onCityTitleClick: (city: City) => void;
}

const FavoriteOffers: React.FunctionComponent<Props> = (props: Props) => {
  const {favoriteApartments, favoriteCities, onCityTitleClick} = props;

  return <div className="page__favorites-container container">
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        { favoriteCities.map((city) =>
          <li className="favorites__locations-items" key={city.id}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a
                  onClick={() => {
                    onCityTitleClick(city);
                    history.push(AppRoute.ROOT);
                  }}
                  className="locations__item-link"
                  href="#"
                >
                  <span>{city.id}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              { favoriteApartments
                .filter((x) => x.cityId === city.id)
                .map((apartment) =>
                  <ApartmentCard
                    key={apartment.id}
                    parentBox={ApartmentEnvironment.FAVORITE}
                    apartment={apartment}
                    onApartmentCardHover={() => null}
                  />
                )
              }
            </div>
          </li>
        )}
      </ul>
    </section>
  </div>;
};

export default FavoriteOffers;
