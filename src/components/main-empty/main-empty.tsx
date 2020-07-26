import React from 'react';
import PropTypes from 'prop-types';

const MainEmpty = ({detailMessage}) => (
  <div className="cities">
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">{detailMessage}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  </div>
);

MainEmpty.propTypes = {
  detailMessage: PropTypes.string.isRequired,
};

export default MainEmpty;
