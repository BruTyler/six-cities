import React from 'react';
import renderer from 'react-test-renderer';
import ReviewItem from './review-item.jsx';

const SINGLE_REVIEW = {
  authorName: `Max`,
  authorAvatar: `img/avatar-max.jpg`,
  rating: 4,
  opinion: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
};

describe(`<ReviewItem /> render suit`, () => {
  it(`<ReviewItem /> render single review`, () => {
    const generatedTree = renderer.create(
        <ReviewItem
          authorName={SINGLE_REVIEW.authorName}
          authorAvatar={SINGLE_REVIEW.authorAvatar}
          rating={SINGLE_REVIEW.rating}
          opinion={SINGLE_REVIEW.opinion}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
