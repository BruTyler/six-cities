import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import MainScreen from './main-screen';
import {SortType, AuthorizationStatus, PlaceType} from '../../const';
import NameSpace from '../../reducer/name-space';
import history from '../../history';
import {City, SingleApartment} from '../../types';


const EMPTY_HANDLER = () => null;
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
    fullDescription: `description1`,
    rating: 0.1,
    price: 1,
    isPremium: true,
    isFavourite: true,
    photo: `img0.jpg`,
    location: [1, 2],
    photoSet: [],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`],
    host: {
      avatar: `img/avatar.jpg`,
      name: `Angelina`,
      isSuper: true,
    },
  },
  {
    id: 1,
    cityId: `Amsterdam`,
    type: PlaceType.ROOM,
    description: `description1`,
    fullDescription: `description3`,
    rating: 1,
    price: 2,
    isPremium: false,
    isFavourite: false,
    photo: `img1.jpg`,
    location: [3, 4],
    photoSet: [],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`],
    host: {
      avatar: `img/avatar.jpg`,
      name: `Angelina`,
      isSuper: true,
    },
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
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen
              activeCity={CITY}
              cityList={[CITY]}
              apartmentList={APARTMENTS}
              onCityTitleClick={EMPTY_HANDLER}
            />
          </Router>
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
        <Router history={history}>
          <MainScreen
            activeCity={CITY}
            cityList={[CITY]}
            apartmentList={[]}
            onCityTitleClick={EMPTY_HANDLER}
          />
        </Router>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
