import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ApartmentList from '../apartment-list/apartment-list.jsx';
import {connect} from 'react-redux';

import {PlaceType} from '../../const.js';
import ReviewList from '../review-list/review-list.jsx';
import Header from '../header/header.jsx';
import Map from '../map/map.jsx';
import {getCity, getApartmentList, getCities, getNeighboorApartments, getApartment} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getAuthInfo} from '../../reducer/user/selectors.js';
import {ActionCreator} from '../../reducer/application/application.js';

class Property extends PureComponent {

  constructor(props) {
    super(props);

    this._init();
  }

  _init() {
    const {id, handleUpdateApartment} = this.props;
    handleUpdateApartment(id);
  }

  componentDidUpdate(prevProps) {
    const {id, handleUpdateApartment} = this.props;
    if (id !== prevProps.id) {
      handleUpdateApartment(this.props.id);
    }
  }

  render() {
    if (this.props.apartment === undefined) {
      return null;
    }

    const {apartment: currentApartment, neighboorApartmentList, activeCity, authInfo} = this.props;
    const {
      type, description, fullDescription, rating, price, isPremium, isFavourite,
      photoSet, bedrooms, adultsMax, goods, host
    } = currentApartment;
    const percentageRating = Math.round(Math.round(rating) / 5 * 100);
    const apartmentListForMap = [...neighboorApartmentList, currentApartment];

    return <div className="page">
      <Header authInfo={authInfo}/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {photoSet.map((photo) => {
                return <div className="property__image-wrapper" key={photo}>
                  <img className="property__image" src={photo} alt={description} />
                </div>;
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{description}</h1>
                <button className={
                  `property__bookmark-button 
              ${isFavourite ? `` : `property__bookmark-button--active `}
              button`
                } type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isFavourite ? `In` : `To`} bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${percentageRating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                Max {adultsMax} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) =>
                    <li className="property__inside-item" key={good}>{good}</li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {fullDescription}
                  </p>
                </div>
              </div>
              <ReviewList />
            </div>
          </div>
          <Map
            className="property__map"
            apartmentList={apartmentListForMap}
            city={activeCity}
            activeApartment={currentApartment}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <ApartmentList
              className="near-places"
              apartmentList={neighboorApartmentList}
            />
          </section>
        </div>
      </main>
    </div>;
  }
}

Property.propTypes = {
  neighboorApartmentList: PropTypes.array.isRequired,
  activeCity: PropTypes.shape().isRequired,
  apartment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(PlaceType)).isRequired,
    description: PropTypes.string.isRequired,
    fullDescription: PropTypes.string,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    photoSet: PropTypes.arrayOf(PropTypes.string).isRequired,
    bedrooms: PropTypes.number.isRequired,
    adultsMax: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }),
  }),
  authInfo: PropTypes.shape(),
  id: PropTypes.string.isRequired,
  handleUpdateApartment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    neighboorApartmentList: getNeighboorApartments(state),
    apartmentList: getApartmentList(state),
    cityList: getCities(state),
    activeCity: getCity(state),
    authStatus: getAuthorizationStatus(state),
    authInfo: getAuthInfo(state),
    apartment: getApartment(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleUpdateApartment(id) {
    dispatch(ActionCreator.changeApartment(Number(id)));
  },
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
