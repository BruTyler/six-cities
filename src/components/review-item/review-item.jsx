import React from 'react';
import PropTypes from 'prop-types';

const ReviewItem = ({authorName, authorAvatar, rating, opinion}) => {
  let percentageRating = Math.round(Math.round(rating) / 5 * 100);

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={authorAvatar} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">{authorName}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${percentageRating}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{opinion}</p>
      <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
    </div>
  </li>;
};

ReviewItem.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  opinion: PropTypes.string.isRequired,
};

export default ReviewItem;
