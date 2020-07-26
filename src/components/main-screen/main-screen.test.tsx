import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import MainScreen from './main-screen';
import {SortType, AuthorizationStatus} from '../../const';
import NameSpace from '../../reducer/name-space';
import history from '../../history';


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
