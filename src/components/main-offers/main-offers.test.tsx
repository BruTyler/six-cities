import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MainOffers} from './main-offers';
import configureStore from 'redux-mock-store';
import {SortType, AuthorizationStatus, PlaceType} from '../../const';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space';
import {City, SingleApartment} from '../../types';

const CITY: City = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1,
};
const APARTMENTS: SingleApartment[] = [
  {
    id: 0,
    cityId: `Amsterdam`,
    type: PlaceType.APARTMENT,
    description: `description0`,
    fullDescription: `d1`,
    rating: 0.1,
    price: 1,
    isPremium: true,
    isFavourite: true,
    photo: `img0.jpg`,
    photoSet: [],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`],
    host: {
      avatar: `img.jpg`,
      name: `A`,
      isSuper: true,
    },
    location: [1, 1],
  },
  {
    id: 1,
    cityId: `Amsterdam`,
    type: PlaceType.ROOM,
    description: `description1`,
    fullDescription: `d1`,
    rating: 1,
    price: 2,
    isPremium: false,
    isFavourite: false,
    photo: `img1.jpg`,
    photoSet: [],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`],
    host: {
      avatar: `img.jpg`,
      name: `A`,
      isSuper: true,
    },
    location: [1, 1],
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
            onItemSelect={() => null}
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
