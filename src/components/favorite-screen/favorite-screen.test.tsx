import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import {FavoriteScreen} from './favorite-screen';
import {AuthorizationStatus, PlaceType} from '../../const';
import NameSpace from '../../reducer/name-space';
import history from '../../history';
import {City, SingleApartment} from '../../types';

const CITY: City = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1
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
    location: [1, 2],
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
    location: [3, 4],
  }
];
const mockStore = configureStore();

describe(`<FavoriteScreen /> render suit`, () => {
  it(`<FavoriteScreen /> render favorite apartment list case`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <FavoriteScreen
              favoriteApartments={APARTMENTS}
              favoriteCities={[CITY]}
              handleChangeCity={() => null}
              handleLoadFavorites={() => null}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`<FavoriteScreen /> render zero favorite message`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <FavoriteScreen
              favoriteApartments={[]}
              favoriteCities={[]}
              handleChangeCity={() => null}
              handleLoadFavorites={() => null}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
