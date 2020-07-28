import * as React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {MainOffers} from './main-offers';
import {SortType, AuthorizationStatus, PlaceType} from '../../const';
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

describe(`<MainOffers /> e2e suite`, () => {
  it(`<MainOffers /> Apartment title is pressed`, () => {
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
    const onApartmentHoverMock = jest.fn();

    const mainOffersWrapper = mount(
        <Provider store={store}>
          <MainOffers
            activeCity={CITY}
            apartmentList={APARTMENTS}
            onItemSelect={onApartmentHoverMock}
          />
        </Provider>
    );

    const apartmentsElems = mainOffersWrapper.find(`.place-card`);
    const eventMock = {preventDefault: () => null};
    apartmentsElems.at(0).simulate(`mouseEnter`, eventMock);

    expect(apartmentsElems.length).toBe(2);
    expect(onApartmentHoverMock.mock.calls.length).toBe(1);
  });
});
