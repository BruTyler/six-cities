import * as React from 'react';
import PropTypes from 'prop-types';
import ApartmentList from '../apartment-list/apartment-list';
import {connect} from 'react-redux';

import {PlaceType, ApartmentEnvironment, BuisnessRequirements, MapEnvironment} from '../../const';
import ReviewList from '../review-list/review-list';
import Header from '../header/header';
import Map from '../map/map';
import {getCity, getApartmentList, getCities, getNeighboorApartments, getApartment} from '../../reducer/data/selectors';
import {getAuthorizationStatus, getAuthInfo} from '../../reducer/user/selectors';
import {ActionCreator} from '../../reducer/application/application';
import {Operation as DataOperation} from '../../reducer/data/data';

class Property extends React.PureComponent {

  constructor(props) {
    super(props);
    props.handleApartmentChange(props.id);
  }

  componentDidUpdate(prevProps) {
    const {id, handleApartmentChange} = this.props;
    if (id !== prevProps.id) {
      handleApartmentChange(id);
    }
  }

  render() {
    if (this.props.apartment === undefined) {
      return null;
    }

    const {apartment: currentApartment, neighboorApartmentList, activeCity, authInfo, handleFavoriteStatusChange} = this.props;
    const {
      type, description, fullDescription, rating, price, isPremium, isFavourite,
      photoSet, bedrooms, adultsMax, goods, host
    } = currentApartment;
    const percentageRating = Math.round(Math.round(rating) / 5 * 100);
    const apartmentListForMap = [...neighboorApartmentList, currentApartment];
    const limitedPhotoSet = photoSet.slice(0, BuisnessRequirements.MAX_PHOTOS_PER_APARTMENT);

    return <div className="page">
      <Header authInfo={authInfo}/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {limitedPhotoSet.map((photo) => {
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
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{description}</h1>
                <button
                  className={`property__bookmark-button button ${isFavourite ? `property__bookmark-button--active` : ``}`}
                  type="button"
                  onClick={() => handleFavoriteStatusChange(currentApartment)}
                >
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
            parentBox={MapEnvironment.NEARBY_PLACES}
            apartmentList={apartmentListForMap}
            city={activeCity}
            activeApartment={currentApartment}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <ApartmentList
              parentBox={ApartmentEnvironment.NEARBY_PLACES}
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
  id: PropTypes.number.isRequired,
  handleApartmentChange: PropTypes.func.isRequired,
  handleFavoriteStatusChange: PropTypes.func.isRequired,
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
  handleApartmentChange(apartmentId) {
    dispatch(ActionCreator.changeApartment(apartmentId));
    dispatch(DataOperation.loadNeighboorApartments(apartmentId));
  },
  handleFavoriteStatusChange(apartment) {
    dispatch(DataOperation.updateFavoriteStatus(apartment));
  },
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
