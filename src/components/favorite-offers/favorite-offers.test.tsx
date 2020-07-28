import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import FavoriteOffers from './favorite-offers';
import {AuthorizationStatus, PlaceType} from '../../const';
import NameSpace from '../../reducer/name-space';
import {City, SingleApartment} from '../../types';

const CITIES: City[] = [
  {
    id: `A`,
    location: [1, 1],
    defaultZoom: 1
  },
  {
    id: `B`,
    location: [2, 2],
    defaultZoom: 2
  },
];

const APARTMENTS: SingleApartment[] = [
  {
    id: 0,
    cityId: `A`,
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
    location: [1, 2],
  },
  {
    id: 1,
    cityId: `A`,
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
    location: [3, 4],
  },
  {
    id: 2,
    cityId: `B`,
    type: PlaceType.ROOM,
    description: `description3`,
    fullDescription: `d1`,
    rating: 3,
    price: 3,
    isPremium: false,
    isFavourite: false,
    photo: `img2.jpg`,
    photoSet: [],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`],
    host: {
      avatar: `img.jpg`,
      name: `A`,
      isSuper: true,
    },
    location: [5, 6],
  },
];

const mockStore = configureStore();

describe(`<FavoriteOffers /> render suit`, () => {
  it(`<FavoriteOffers /> render favorite apartment list case`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });
    const generatedTree = renderer.create(
        <Provider store={store}>
          <FavoriteOffers
            favoriteCities={CITIES}
            favoriteApartments={APARTMENTS}
            onCityTitleClick={() => null}
          />
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
