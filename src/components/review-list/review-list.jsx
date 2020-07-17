import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/data/data.js';
import {getReviews} from '../../reducer/data/selectors.js';
import ReviewItem from '../review-item/review-item.jsx';
import ReviewForm from '../review-form/review-form.jsx';

class ReviewList extends PureComponent {
  constructor(props) {
    super(props);

    this._init();
  }

  _init() {
    const {handleLoadReviews, apartmentId} = this.props;
    handleLoadReviews(apartmentId);
  }

  render() {
    const {reviewList} = this.props;

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
      <ReviewForm activeItem={``}/>
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
  handleLoadReviews: PropTypes.func.isRequired,
  apartmentId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    reviewList: getReviews(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleLoadReviews(apartmentId) {
    dispatch(Operation.loadReviews(apartmentId));
  },
});

export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
