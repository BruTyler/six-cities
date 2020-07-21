import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import ApartmentList from './apartment-list.jsx';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus, ApartmentEnvironment} from '../../const.js';

const APARTMENTS = [
  {
    id: 0,
    type: `Apartment`,
    description: `description0`,
    rating: 0.1,
    price: 1,
    isPremium: true,
    isFavourite: true,
    photo: `img0.jpg`
  },
  {
    id: 1,
    type: `Private room`,
    description: `description1`,
    rating: 1,
    price: 2,
    isPremium: false,
    isFavourite: false,
    photo: `img1.jpg`
  }
];
const mockStore = configureStore();

describe(`<ApartmentList /> render suit`, () => {
  it(`<ApartmentList /> render apartment list`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });
    const generatedTree = renderer.create(
        <Provider store={store}>
          <ApartmentList
            parentBox={ApartmentEnvironment.MAIN_WINDOW}
            apartmentList={APARTMENTS}
          />
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
