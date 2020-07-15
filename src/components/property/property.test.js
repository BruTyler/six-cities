import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import Property from './property.jsx';
import NameSpace from '../../reducer/name-space.js';
import {createAPI} from '../../api.js';

const EMPTY_HANDLER = () => {};
const CITY = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1,
};
const SINGLE_APARTMENT = {
  id: 1,
  cityId: `Amsterdam`,
  type: `Private room`,
  description: `description1`,
  fullDescription: `full description1`,
  rating: 1,
  price: 2,
  isPremium: false,
  isFavourite: false,
  photo: `img0.jpg`,
  photoSet: [
    `img1.jpg`,
    `img2.jpg`,
  ],
  bedrooms: 3,
  adultsMax: 4,
  goods: [`WiFi`, `TV`],
  host: {
    avatar: `ava.jpg`,
    name: `name`,
    isSuper: true,
  },
  location: [1, 1],
};

const REVIEWS = [
  {
    id: 1,
    authorName: `Max`,
    authorAvatar: `img/avatar-max.jpg`,
    rating: 4,
    opinion: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    publishDate: `2014-05-20`,
  },
];

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
apiMock
  .onAny()
  .reply(200, []);
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe(`<Property /> render suit`, () => {
  it(`<Property /> render single apartment`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        reviewList: REVIEWS,
      },
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <Property
            city={CITY}
            onApartmentTitleClick={EMPTY_HANDLER}
            neighboorApartmentList={[SINGLE_APARTMENT]}
            apartment={SINGLE_APARTMENT}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
