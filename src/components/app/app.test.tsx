import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app';
import {SortType, AuthorizationStatus} from '../../const';
import NameSpace from '../../reducer/name-space';

const EMPTY_HANDLER = () => {};
const CITIES = [
  {
    id: `A`,
    location: [1, 2],
    defaultZoom: 1
  },
  {
    id: `B`,
    location: [3, 4],
    defaultZoom: 2
  },
];

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
    photoSet: [`img2.jpg`],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`WiFi`, `TV`],
    host: {
      avatar: `ava.jpg`,
      name: `name`,
      isSuper: true,
    },
    location: [1, 2],
  },
];
const mockStore = configureStore();

describe(`<App /> render suit`, () => {
  it(`<App /> render apartment list`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        apartmentList: APARTMENTS,
      },
      [NameSpace.APPLICATION]: {
        sortType: SortType.POPULAR,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <App
            cityList={CITIES}
            activeCity={CITIES[0]}
            apartmentList={APARTMENTS}
            handleChangeCity={EMPTY_HANDLER}
            handleFirstCityLoad={EMPTY_HANDLER}
            handleFetchingHotels={EMPTY_HANDLER}
            handleFinishLoading={EMPTY_HANDLER}
            handleLoginSubmit={EMPTY_HANDLER}
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