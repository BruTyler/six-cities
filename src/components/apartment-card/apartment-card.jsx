import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {PlaceType, AppRoute, AuthorizationStatus, ApartmentEnvironment} from '../../const.js';
import history from '../../history.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';

class ApartmentCard extends PureComponent {
  constructor(props) {
    super(props);

    this.handleApartmentTitleClick = this.handleApartmentTitleClick.bind(this);
    this.handleFavoriteClickNotLogged = this.handleFavoriteClickNotLogged.bind(this);
  }

  handleApartmentTitleClick(id) {
    const newLocation = AppRoute.PROPERTY_WITH_ID.replace(`:id`, id);
    history.push(newLocation);
  }

  handleFavoriteClickNotLogged() {
    const newLocation = AppRoute.AUTH;
    history.push(newLocation);
  }

  render() {
    const {parentBox, apartment, onApartmentCardHover, authStatus, handleFavoriteStatusChange} = this.props;
    const percentageRating = Math.round(Math.round(apartment.rating) / 5 * 100);

    return <article className={`${parentBox}__place-card ${parentBox}__card place-card`}
      onMouseEnter={() => onApartmentCardHover(apartment)}
      onMouseLeave={() => onApartmentCardHover()}
    >
      {apartment.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${parentBox}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={apartment.photo}
            width={parentBox === ApartmentEnvironment.FAVORITE ? `150` : `260`}
            height={parentBox === ApartmentEnvironment.FAVORITE ? `110` : `200`}
            alt={apartment.description}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{apartment.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            type="button"
            className={`place-card__bookmark-button button${apartment.isFavourite ? ` place-card__bookmark-button--active` : ``}`}
            onClick={authStatus === AuthorizationStatus.AUTH
              ? () => handleFavoriteStatusChange(apartment, parentBox)
              : () => this.handleFavoriteClickNotLogged()}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{apartment.isFavourite ? `In` : `To`} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${percentageRating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#" onClick={() => this.handleApartmentTitleClick(apartment.id)}>{apartment.description}</a>
        </h2>
        <p className="place-card__type">{apartment.type}</p>
      </div>
    </article>;
  }
}

ApartmentCard.defaultProps = {
  onApartmentCardHover: () => {},
};

ApartmentCard.propTypes = {
  parentBox: PropTypes.oneOf(Object.values(ApartmentEnvironment)).isRequired,
  apartment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(PlaceType)).isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    photo: PropTypes.string.isRequired
  }).isRequired,
  onApartmentCardHover: PropTypes.func.isRequired,
  authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)),
  handleFavoriteStatusChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authStatus: getAuthorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleFavoriteStatusChange(apartment, parentBox) {
    if (parentBox === ApartmentEnvironment.FAVORITE) {
      dispatch(DataOperation.removeFavorite(apartment));
    } else {
      dispatch(DataOperation.updateFavoriteStatus(apartment));
    }
  },
});

export {ApartmentCard};
export default connect(mapStateToProps, mapDispatchToProps)(ApartmentCard);
