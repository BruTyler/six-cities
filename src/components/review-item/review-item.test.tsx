import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewItem from './review-item';

const SINGLE_REVIEW = {
  id: 0,
  authorName: `Max`,
  authorAvatar: `img.jpg`,
  rating: 4,
  opinion: `nice`,
  publishDate: `2011-02-15T10:54:44.805Z`,
};

describe(`<ReviewItem /> render suit`, () => {
  it(`<ReviewItem /> render single review`, () => {
    const generatedTree = renderer.create(
        <ReviewItem
          key={SINGLE_REVIEW.id}
          authorName={SINGLE_REVIEW.authorName}
          authorAvatar={SINGLE_REVIEW.authorAvatar}
          rating={SINGLE_REVIEW.rating}
          opinion={SINGLE_REVIEW.opinion}
          publishDate={SINGLE_REVIEW.publishDate}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
