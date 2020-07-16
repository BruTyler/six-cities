import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operation} from './data.js';
import ApartmentsMock from '../../mocks/offers.js';
import CitiesMock from '../../mocks/cities.js';
import ReviewsMock from '../../mocks/reviews.js';

const api = createAPI(() => {});

describe(`Data reducer unit-test`, () => {
  it(`Data reducer should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      cityList: [],
      apartmentList: [],
      reviewList: [],
    });
  });

  it(`Data reducer should load reviews`, () => {
    expect(reducer({
      reviewList: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: ReviewsMock,
    })).toEqual({
      reviewList: ReviewsMock,
    });
  });

  it(`Data reducer should load hotels`, () => {
    expect(reducer({
      cityList: [],
      apartmentList: [],
    }, {
      type: ActionType.LOAD_HOTELS,
      payload: {
        cities: CitiesMock,
        apartments: ApartmentsMock},
    })).toEqual({
      cityList: CitiesMock,
      apartmentList: ApartmentsMock,
    });
  });

  it(`Data reducer should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelLoader = Operation.loadCitiesWithApartments();

    apiMock
      .onGet(`/hotels`)
      .reply(200, []);

    return hotelLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });
});
