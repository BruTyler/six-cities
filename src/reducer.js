import CitiesMock from './mocks/cities.js';
import ApartmentContentMock from './mocks/offers.js';
import {extend, getItemById} from './utils.js';

const DEFAULT_CITY_ID = 0;

const initialState = {
  city: getItemById(CitiesMock, DEFAULT_CITY_ID),
  cityList: CitiesMock,
  apartmentList: ApartmentContentMock.filter((x) => x.cityId === DEFAULT_CITY_ID)
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreator = {
  changeCity: (cityId) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: cityId,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: getItemById(CitiesMock, action.payload),
        apartmentList: ApartmentContentMock.filter((x) => x.cityId === action.payload),
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
