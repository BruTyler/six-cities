import React from 'react';
import renderer from 'react-test-renderer';
import ReviewList from './review-list.jsx';

const REVIEWS = [
  {
    id: 1,
    authorName: `name1`,
    authorAvatar: `img1.jpg`,
    rating: 4,
    opinion: `Ok`,
    publishDate: `2011-02-17`,
  },
  {
    id: 2,
    authorName: `name2`,
    authorAvatar: `img2.jpg`,
    rating: 5,
    opinion: `Good`,
    publishDate: `2011-02-15`,
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
