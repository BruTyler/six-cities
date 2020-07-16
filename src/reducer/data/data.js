import {extend} from '../../utils.js';
import {transformToCities, transformToApartments, transformToReviews} from '../../adapters/fetch-manager.js';

const initialState = {
  cityList: [],
  apartmentList: [],
  reviewList: [],
};

const ActionType = {
  LOAD_CITIES: `LOAD_CITIES`,
  LOAD_APARTMENTS: `LOAD_APARTMENTS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  loadCities: (cities) => {
    return {
      type: ActionType.LOAD_CITIES,
      payload: cities,
    };
  },
  loadApartments: (apartments) => {
    return {
      type: ActionType.LOAD_APARTMENTS,
      payload: apartments,
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
};

const Operation = {
  loadCitiesWithApartments: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
        .then((response) => {
          if (response && response.data) {
            const cities = transformToCities(response.data);
            dispatch(ActionCreator.loadCities(cities));
            const apartments = transformToApartments(response.data);
            dispatch(ActionCreator.loadApartments(apartments));
          }
        });
  },
  loadReviews: (apartmentId) => (dispatch, getState, api) => {
    return api.get(`/comments/${apartmentId}`)
        .then((response) => {
          const reviews = transformToReviews(response.data);
          dispatch(ActionCreator.loadReviews(reviews));
        });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CITIES:
      return extend(state, {
        cityList: action.payload,
      });
    case ActionType.LOAD_APARTMENTS:
      return extend(state, {
        apartmentList: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviewList: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
