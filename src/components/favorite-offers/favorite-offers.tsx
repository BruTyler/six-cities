import React from 'react';
import PropTypes from 'prop-types';
import ApartmentCard from '../apartment-card/apartment-card.jsx';
import history from '../../history.js';
import {AppRoute, ApartmentEnvironment} from '../../const.js';

const FavoriteOffers = (props) => {
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

FavoriteOffers.propTypes = {
  favoriteApartments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    cityId: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  favoriteCities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onCityTitleClick: PropTypes.func.isRequired,
};

export default FavoriteOffers;
