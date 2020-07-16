import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {ReviewList} from './review-list.jsx';
import NameSpace from '../../reducer/name-space.js';
import {Provider} from 'react-redux';

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
const mockStore = configureStore();

describe(`<ReviewList /> render suit`, () => {
  it(`<ReviewList /> render list of reviews`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        reviewList: REVIEWS,
      },
    });
    const generatedTree = renderer.create(
        <Provider store={store}>
          <ReviewList
            reviewList={REVIEWS}
            apartmentId={0}
            handleLoadReviews={EMPTY_HANDLER}
          />
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`<ReviewList /> render empty list of reviews`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        reviewList: [],
      },
    });
    const generatedTree = renderer.create(
        <Provider store={store}>
          <ReviewList
            reviewList={[]}
            apartmentId={0}
            handleLoadReviews={EMPTY_HANDLER}
          />
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
