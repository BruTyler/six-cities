import * as React from 'react';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/data/data';
import {getReviews, getApiError} from '../../reducer/data/selectors';
import {getApartmentId} from '../../reducer/application/selectors';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {AuthorizationStatus} from '../../const';
import {Review, ReviewFormData} from '../../types';

interface Props {
  reviewList: Array<Review>;
  handleReviewsLoad: (apartmentId: number) => void;
  apartmentId: number;
  authStatus: AuthorizationStatus;
  handleReviewSend: (obj: ReviewFormData) => Promise<void>;
  errorSubmitMsg?: string;
}

class ReviewList extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    props.handleReviewsLoad(props.apartmentId);
  }

  componentDidUpdate(prevProps) {
    const {handleReviewsLoad, apartmentId} = this.props;
    if (apartmentId !== prevProps.apartmentId) {
      handleReviewsLoad(apartmentId);
    }
  }

  render() {
    const {reviewList, authStatus, apartmentId, handleReviewSend, errorSubmitMsg} = this.props;

    return <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewList.length}</span></h2>
      <ul className="reviews__list">
        {reviewList.map((review) =>
          <ReviewItem
            key={review.id}
            authorName={review.authorName}
            authorAvatar={review.authorAvatar}
            rating={review.rating}
            opinion={review.opinion}
            publishDate={review.publishDate}
          />)
        }
      </ul>
      { authStatus === AuthorizationStatus.AUTH &&
       <ReviewForm
         activeItem={true}
         apartmentId={apartmentId}
         onFormSubmit={handleReviewSend}
         errorMsg={errorSubmitMsg}
       />
      }
    </section>;
  }
}

const mapStateToProps = (state) => {
  return {
    apartmentId: getApartmentId(state),
    reviewList: getReviews(state),
    authStatus: getAuthorizationStatus(state),
    errorSubmitMsg: getApiError(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleReviewsLoad(apartmentId) {
    dispatch(Operation.loadReviews(apartmentId));
  },
  handleReviewSend(comment) {
    return dispatch(Operation.sendReview(comment));
  },
});

export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
