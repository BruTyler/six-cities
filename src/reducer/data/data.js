import {extend} from '../../utils.js';
import {transformToCities, transformToApartments, transformToReviews} from '../../adapters/fetch-manager.js';

const initialState = {
  cityList: [],
  apartmentList: [],
  reviewList: [],
};

const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  loadHotels: (cities, apartments) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: {cities, apartments},
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
            const apartments = transformToApartments(response.data);
            dispatch(ActionCreator.loadHotels(cities, apartments));
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
    case ActionType.LOAD_HOTELS:
      return extend(state, {
        cityList: action.payload.cities,
        apartmentList: action.payload.apartments,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviewList: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
