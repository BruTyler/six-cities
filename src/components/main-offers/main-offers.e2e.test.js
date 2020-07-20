import React from 'react';
import {mount} from 'enzyme';
import MainOffers from './main-offers.jsx';
import configureStore from 'redux-mock-store';
import {SortType, AuthorizationStatus} from '../../const.js';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space.js';

const EMPTY_HANDLER = () => {};
const CITY = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1,
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
    location: [1, 1],
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
            cityList={[CITY]}
            apartmentList={APARTMENTS}
            onCityTitleClick={EMPTY_HANDLER}
            onItemSelect={onApartmentHoverMock}
          />
        </Provider>
    );

    const apartmentsElems = mainOffersWrapper.find(`.place-card`);
    const eventMock = {preventDefault() {}};
    apartmentsElems.at(0).simulate(`mouseEnter`, eventMock);

    expect(apartmentsElems.length).toBe(2);
    expect(onApartmentHoverMock.mock.calls.length).toBe(1);
  });
});
