import React from 'react';
import PropTypes from 'prop-types';
import {PlaceType} from '../../const';

const ApartmentCard = (props) => {
  const {apartment, onApartmentCardHover} = props;
  const percentageRating = Math.round(apartment.rating / 5 * 100);

  return <article className="cities__place-card place-card"
    onMouseEnter={onApartmentCardHover(apartment)}>
    {apartment.isPremium ?
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={apartment.photo} width="260" height="200" alt={apartment.description} />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{apartment.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={
          `place-card__bookmark-button 
          ${apartment.isFavourite ? `` : `place-card__bookmark-button--active `}
          button`
        } type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{apartment.isFavourite ? `In` : `To`} bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={`width: ${percentageRating}%`}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{apartment.description}</a>
      </h2>
      <p className="place-card__type">{apartment.type}</p>
    </div>
  </article>;
};

ApartmentCard.propTypes = {
  apartment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf([PlaceType.APARTMENT, PlaceType.PRIVATE_ROOM]).isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    photo: PropTypes.string.isRequired
  }).isRequired,
  onApartmentCardHover: PropTypes.func.isRequired
};

export default ApartmentCard;
