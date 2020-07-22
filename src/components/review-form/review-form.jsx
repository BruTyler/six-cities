import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {BuisnessRequirements} from '../../const.js';

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this._textRef = createRef();
    this._starRefs = new Array(5);
    for (let i = 0; i < this._starRefs.length; i++) {
      this._starRefs[i] = createRef();
    }

    this.handleButtonUnlock = this.handleButtonUnlock.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormInit = this.handleFormInit.bind(this);
    this.handleFormFreeze = this.handleFormFreeze.bind(this);
  }

  componentDidMount() {
    this.handleFormInit();
  }

  handleFormInit() {
    const {onItemSelect: setButtonDisabled} = this.props;
    setButtonDisabled(true);
    this._textRef.current.value = ``;
    this._starRefs.forEach((x) => {
      x.current.checked = false;
    });
  }

  handleFormFreeze(isDisabled) {
    const {onItemSelect: setButtonDisabled} = this.props;
    setButtonDisabled(isDisabled);
    this._textRef.current.disabled = isDisabled;
    this._starRefs.forEach((x) => {
      x.current.disabled = isDisabled;
    });
  }

  handleFormSubmit(evt) {
    const {onFormSubmit, apartmentId} = this.props;

    this.handleFormFreeze(true);
    evt.preventDefault();

    const comment = this._textRef.current.value;
    const checkedStarRef = this._starRefs.find((x) => x.current.checked === true);
    const rating = Number(checkedStarRef.current.value);

    onFormSubmit({comment, rating, apartmentId})
        .then(() => {
          this.handleFormFreeze(false);
          this.handleFormInit();
        })
        .catch(() => {
          this.handleFormFreeze(false);
        });
  }

  handleButtonUnlock() {
    const {onItemSelect: setButtonDisabled} = this.props;

    const text = this._textRef.current.value;
    const isStarChecked = this._starRefs.findIndex((x) => x.current.checked === true) !== -1;

    if (isStarChecked
        && text.length >= BuisnessRequirements.MIN_REVIEW_TEXT_LENGTH
        && text.length <= BuisnessRequirements.MAX_REVIEW_TEXT_LENGTH) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  render() {
    const {activeItem: isSubmitButtonDisabled, errorMsg} = this.props;

    return <form
      className="reviews__form form"
      action=""
      onSubmit={this.handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
          ref={this._starRefs[4]}
          onClick={this.handleButtonUnlock}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
          ref={this._starRefs[3]}
          onClick={this.handleButtonUnlock}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
          ref={this._starRefs[2]}
          onClick={this.handleButtonUnlock}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
          ref={this._starRefs[1]}
          onClick={this.handleButtonUnlock}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
          ref={this._starRefs[0]}
          onClick={this.handleButtonUnlock}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={this.handleButtonUnlock}
        ref={this._textRef}
      >
      </textarea>
      <span style={{color: `red`}}>{errorMsg}</span>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{BuisnessRequirements.MIN_REVIEW_TEXT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button" type="submit"
          disabled={isSubmitButtonDisabled}
        >
           Submit
        </button>
      </div>
    </form>;
  }
}

ReviewForm.propTypes = {
  activeItem: PropTypes.bool,
  onItemSelect: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  apartmentId: PropTypes.number.isRequired,
  errorMsg: PropTypes.string,
};

export {ReviewForm};
export default withActiveItem(ReviewForm);
