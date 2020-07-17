import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {BuisnessRequirements} from '../../const';

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this.textRef = createRef();
    this.messageRef = createRef();
    this.starRefs = new Array(5);
    for (let i = 0; i < this.starRefs.length; i++) {
      this.starRefs[i] = createRef();
    }

    this.handleUnblockSubmitButton = this.handleUnblockSubmitButton.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInitForm = this.handleInitForm.bind(this);
    this.handleFreezeForm = this.handleFreezeForm.bind(this);
  }

  componentDidMount() {
    this.handleInitForm();
  }

  handleInitForm() {
    const {onItemSelect: setButtonDisabled} = this.props;
    setButtonDisabled(true);
    this.errorMsg = ``;
    this.textRef.current.value = ``;
    this.starRefs.forEach((x) => {
      x.current.checked = false;
    });
  }

  handleFreezeForm(isDisabled) {
    const {onItemSelect: setButtonDisabled} = this.props;
    setButtonDisabled(isDisabled);
    this.textRef.current.disabled = isDisabled;
    this.starRefs.forEach((x) => {
      x.current.disabled = isDisabled;
    });
  }

  handleSubmitForm(evt) {
    const {onSubmitForm, apartmentId} = this.props;

    this.handleFreezeForm(true);
    evt.preventDefault();

    const comment = this.textRef.current.value;
    const checkedStarRef = this.starRefs.find((x) => x.current.checked === true);
    const rating = Number(checkedStarRef.current.value);

    onSubmitForm({comment, rating, apartmentId})
        .then(() => {
          this.handleFreezeForm(false);
          this.handleInitForm();
        })
        .catch(() => {
          this.errorMsg = `Failed request to server`;
          this.forceUpdate();
          this.handleFreezeForm(false);
        });
  }

  handleUnblockSubmitButton() {
    const {onItemSelect: setButtonDisabled} = this.props;

    const text = this.textRef.current.value;
    const isStarChecked = this.starRefs.findIndex((x) => x.current.checked === true) !== -1;

    if (isStarChecked
        && text.length >= BuisnessRequirements.MIN_REVIEW_TEXT_LENGTH
        && text.length <= BuisnessRequirements.MAX_REVIEW_TEXT_LENGTH) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  render() {
    const {activeItem: isSubmitButtonDisabled} = this.props;

    return <form
      className="reviews__form form"
      action=""
      onSubmit={this.handleSubmitForm}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
          ref={this.starRefs[4]}
          onClick={this.handleUnblockSubmitButton}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
          ref={this.starRefs[3]}
          onClick={this.handleUnblockSubmitButton}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
          ref={this.starRefs[2]}
          onClick={this.handleUnblockSubmitButton}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
          ref={this.starRefs[1]}
          onClick={this.handleUnblockSubmitButton}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
          ref={this.starRefs[0]}
          onClick={this.handleUnblockSubmitButton}
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
        onChange={this.handleUnblockSubmitButton}
        ref={this.textRef}
      >
      </textarea>
      <span style={{color: `red`}}>{this.errorMsg}</span>
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
  onSubmitForm: PropTypes.func.isRequired,
  apartmentId: PropTypes.number.isRequired,
};

export {ReviewForm};
export default withActiveItem(ReviewForm);
