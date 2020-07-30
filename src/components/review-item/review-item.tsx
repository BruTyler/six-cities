import * as React from 'react';
import {getMonthName, getShortDate} from './../../utils';
import {Review, WithId} from '../../types';
import {Subtract} from 'utility-types';

type Props = Subtract<Review, WithId<number>>;

const ReviewItem: React.FunctionComponent<Props> = (props: Props) => {
  const {authorName, authorAvatar, rating, opinion, publishDate: rawDate} = props;
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

export default ReviewItem;
