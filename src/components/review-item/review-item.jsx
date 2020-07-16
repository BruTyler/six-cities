import React from 'react';
import PropTypes from 'prop-types';
import {getMonthName, getShortDate} from './../../utils.js';

const ReviewItem = ({authorName, authorAvatar, rating, opinion, publishDate: rawDate}) => {
  const percentageRating = Math.round(Math.round(rating) / 5 * 100);
  const convertedDate = new Date(rawDate);
  const monthName = getMonthName(convertedDate.getMonth());
  const year = convertedDate.getFullYear();
  const shortDate = getShortDate(convertedDate);

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
      <time className="reviews__time" dateTime={shortDate}>{monthName} {year}</time>
    </div>
  </li>;
};

ReviewItem.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  opinion: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
};

export default ReviewItem;
