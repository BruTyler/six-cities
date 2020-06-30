import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import ApartmentList from '../apartment-list/apartment-list.jsx';
import Map from '../map/map.jsx';
import CityList from '../city-list/city-list.jsx';

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hoveredApartment: null,
    };

    this.handleApartmentCardHover = this.handleApartmentCardHover.bind(this);
  }

  handleApartmentCardHover(apart) {
    this.setState({
      hoveredApartment: apart
    });
  }

  render() {
    const {activeCity, cityList, apartmentList, onApartmentTitleClick, onCityTitleClick} = this.props;
    const {hoveredApartment} = this.state;

    return <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList
            activeCity={activeCity}
            cityList={cityList}
            onCityTitleClick={onCityTitleClick}
          />
        </div>
        <div className="cities">
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
                apartmentList={apartmentList}
                onApartmentTitleClick={onApartmentTitleClick}
                onApartmentCardHover={this.handleApartmentCardHover}
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
        </div>
      </main>
    </div>;
  }
}

Main.propTypes = {
  activeCity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  apartmentList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired,
  onCityTitleClick: PropTypes.func.isRequired,
};

export default Main;
