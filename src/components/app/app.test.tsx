import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app';
import {SortType, AuthorizationStatus, PlaceType} from '../../const';
import NameSpace from '../../reducer/name-space';
import {City, SingleApartment} from '../../types';

const EMPTY_HANDLER = () => null;
const CITIES: City[] = [
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

const APARTMENTS: SingleApartment[] = [
  {
    id: 0,
    cityId: `A`,
    type: PlaceType.APARTMENT,
    description: `description0`,
    fullDescription: `description1`,
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
