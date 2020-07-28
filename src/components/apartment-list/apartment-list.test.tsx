import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import ApartmentList from './apartment-list';
import NameSpace from '../../reducer/name-space';
import {AuthorizationStatus, ApartmentEnvironment, PlaceType} from '../../const';
import {SingleApartment} from '../../types';

const APARTMENTS: Array<SingleApartment> = [
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
    location: [1, 2],
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
            onApartmentCardHover={() => null}
          />
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
