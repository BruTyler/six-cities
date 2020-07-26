import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {ReviewList} from './review-list';
import {AuthorizationStatus} from '../../const';

const EMPTY_HANDLER = () => {};
const REVIEWS = [
  {
    id: 1,
    authorName: `name1`,
    authorAvatar: `img1.jpg`,
    rating: 4,
    opinion: `Ok`,
    publishDate: `2011-02-17T10:54:44.805Z`,
  },
  {
    id: 2,
    authorName: `name2`,
    authorAvatar: `img2.jpg`,
    rating: 5,
    opinion: `Good`,
    publishDate: `2011-02-15T10:54:44.805Z`,
  },
];

describe(`<ReviewList /> render suit`, () => {
  it(`<ReviewList /> render list of reviews`, () => {
    const generatedTree = renderer.create(
        <ReviewList
          reviewList={REVIEWS}
          apartmentId={0}
          handleReviewsLoad={EMPTY_HANDLER}
          authStatus={AuthorizationStatus.AUTH}
          handleReviewSend={EMPTY_HANDLER}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`<ReviewList /> render empty list of reviews`, () => {
    const generatedTree = renderer.create(
        <ReviewList
          reviewList={[]}
          apartmentId={0}
          handleReviewsLoad={EMPTY_HANDLER}
          authStatus={AuthorizationStatus.NO_AUTH}
          handleReviewSend={EMPTY_HANDLER}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
