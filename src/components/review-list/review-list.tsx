import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/data/data';
import {getReviews, getApiError} from '../../reducer/data/selectors';
import {getApartmentId} from '../../reducer/application/selectors';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {AuthorizationStatus} from '../../const';

class ReviewList extends React.PureComponent {
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
         apartmentId={apartmentId}
         onFormSubmit={handleReviewSend}
         errorMsg={errorSubmitMsg}
       />
      }
    </section>;
  }
}

ReviewList.propTypes = {
  reviewList: PropTypes.arrayOf(PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    opinion: PropTypes.string.isRequired,
  })).isRequired,
  handleReviewsLoad: PropTypes.func.isRequired,
  apartmentId: PropTypes.number.isRequired,
  authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  handleReviewSend: PropTypes.func.isRequired,
  errorSubmitMsg: PropTypes.string
};

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
