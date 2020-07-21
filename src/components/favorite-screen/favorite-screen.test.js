import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import {FavoriteScreen} from './favorite-screen.jsx';
import {AuthorizationStatus} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';
import history from '../../history.js';

const CITY = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1
};
const APARTMENTS = [
  {
    id: 0,
    cityId: `Amsterdam`,
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
    cityId: `Amsterdam`,
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
              handleChangeCity={() => {}}
              handleLoadFavorites={() => {}}
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
              handleChangeCity={() => {}}
              handleLoadFavorites={() => {}}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
