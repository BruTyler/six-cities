import * as React from 'react';
import {mount} from 'enzyme';
import {ReviewForm} from './review-form';


it(`Review form send correct data on submit`, () => {
  const onSubmit = jest.fn(() => Promise.resolve());
  const reviewText = `text`;
  const apartmentId = 1;

  const reviewForm = mount(<ReviewForm
    activeItem={true}
    onItemSelect={() => {}}
    onFormSubmit={onSubmit}
    apartmentId={apartmentId}
  />);

  const {_textRef: textElement, _starRefs: starElements} = reviewForm.instance();
  reviewForm.mount();

  textElement.current.value = reviewText;
  starElements[4].current.checked = true;

  const form = reviewForm.find(`form`);
  form.simulate(`submit`, {preventDefault() {}});

  expect(onSubmit).toHaveBeenCalledTimes(1);

  const expectedRating = 5;
  expect(onSubmit.mock.calls[0][0].apartmentId).toEqual(apartmentId);
  expect(onSubmit.mock.calls[0][0].comment).toEqual(reviewText);
  expect(onSubmit.mock.calls[0][0].rating).toEqual(expectedRating);
});
