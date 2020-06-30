import React from 'react';
import renderer from 'react-test-renderer';
import ReviewList from './review-list.jsx';

const REVIEWS = [
  {
    authorName: `name1`,
    authorAvatar: `img1.jpg`,
    rating: 4,
    opinion: `Ok`,
  },
  {
    authorName: `name2`,
    authorAvatar: `img2.jpg`,
    rating: 5,
    opinion: `Good`,
  },
];

describe(`<ReviewList /> render suit`, () => {
  it(`<ReviewList /> render list of reviews`, () => {
    const generatedTree = renderer.create(
        <ReviewList
          reviewList={REVIEWS}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`<ReviewList /> render empty list of reviews`, () => {
    const generatedTree = renderer.create(
        <ReviewList
          reviewList={[]}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
