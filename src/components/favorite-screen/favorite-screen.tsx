import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../header/header';
import FavoriteEmpty from '../favorite-empty/favorite-empty';
import FavoriteOffers from '../favorite-offers/favorite-offers';
import {AppRoute} from '../../const';
import {Operation} from '../../reducer/data/data';
import {getFavoriteCities, getFavoriteApartments} from '../../reducer/data/selectors';
import {getAuthInfo} from '../../reducer/user/selectors';
import {ActionCreator} from '../../reducer/application/application';
import {SingleApartment, City, AuthInfo} from '../../types';

interface Props {
  favoriteApartments: Array<SingleApartment>;
  favoriteCities: Array<City>;
  handleChangeCity: (city: City) => void;
  authInfo?: AuthInfo;
  handleLoadFavorites: () => void;
}

class FavoriteScreen extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    props.handleLoadFavorites();
  }

  render() {
    const {favoriteCities, favoriteApartments, handleChangeCity, authInfo} = this.props;

    return <div className= {`page${favoriteApartments.length === 0 ? ` page--favorites-empty` : ``}`}>
      <Header authInfo={authInfo} />
      <main className={`page__main page__main--favorites${favoriteApartments.length === 0 ? ` page__main--favorites-empty` : ``}`}>
        {favoriteApartments.length === 0
          ? <FavoriteEmpty />
          : <FavoriteOffers
            favoriteCities={favoriteCities}
            favoriteApartments={favoriteApartments}
            onCityTitleClick={handleChangeCity}
          />}
      </main>
      <footer className="footer container">
        <Link
          className="header__logo-link"
          to={AppRoute.ROOT}
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    authInfo: getAuthInfo(state),
    favoriteApartments: getFavoriteApartments(state),
    favoriteCities: getFavoriteCities(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleChangeCity(city) {
    dispatch(ActionCreator.changeCity(city.id));
  },
  handleLoadFavorites() {
    dispatch(Operation.loadFavorites());
  },
});

export {FavoriteScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
