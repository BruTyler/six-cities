import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './main-screen.jsx';
import configureStore from 'redux-mock-store';
import {SortType, AuthorizationStatus} from '../../const.js';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space.js';

const EMPTY_HANDLER = () => {};
const CITY = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1
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
    location: [1, 2],
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
    location: [3, 4],
  }
];
const mockStore = configureStore();

describe(`<MainScreen /> render suit`, () => {
  it(`<MainScreen /> render apartment list case`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        apartmentList: APARTMENTS,
        cityList: [CITY],
      },
      [NameSpace.APPLICATION]: {
        sortType: SortType.POPULAR,
        cityId: CITY.id,
      },
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <MainScreen
            activeCity={CITY}
            cityList={[CITY]}
            apartmentList={APARTMENTS}
            onApartmentTitleClick={EMPTY_HANDLER}
            onCityTitleClick={EMPTY_HANDLER}
            authStatus={AuthorizationStatus.NO_AUTH}
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

  it(`<MainScreen /> render zero apartment message`, () => {
    const generatedTree = renderer.create(
        <MainScreen
          activeCity={CITY}
          cityList={[CITY]}
          apartmentList={[]}
          onApartmentTitleClick={EMPTY_HANDLER}
          onCityTitleClick={EMPTY_HANDLER}
          authStatus={AuthorizationStatus.NO_AUTH}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
