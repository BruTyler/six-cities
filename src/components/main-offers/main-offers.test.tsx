import React from 'react';
import renderer from 'react-test-renderer';
import {MainOffers} from './main-offers.jsx';
import configureStore from 'redux-mock-store';
import {SortType, AuthorizationStatus} from '../../const.js';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space.js';

const EMPTY_HANDLER = () => {};
const CITY = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1
};
const APARTMENTS = [
  {
    id: 0,
    type: `Apartment`,
    description: `description0`,
    rating: 0.1,
    price: 1,
    isPremium: true,
    isFavourite: true,
    photo: `img0.jpg`,
    location: [1, 2],
  },
  {
    id: 1,
    type: `Private room`,
    description: `description1`,
    rating: 1,
    price: 2,
    isPremium: false,
    isFavourite: false,
    photo: `img1.jpg`,
    location: [3, 4],
  }
];

const mockStore = configureStore();

describe(`<MainOffers /> render suit`, () => {
  it(`<MainOffers /> render apartment list case`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        apartmentList: APARTMENTS,
        cityList: [CITY],
      },
      [NameSpace.APPLICATION]: {
        sortType: SortType.POPULAR,
        cityId: CITY.id,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });
    const generatedTree = renderer.create(
        <Provider store={store}>
          <MainOffers
            activeCity={CITY}
            apartmentList={APARTMENTS}
            onApartmentTitleClick={EMPTY_HANDLER}
            activeItem={void 0}
            onItemSelect={EMPTY_HANDLER}
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
