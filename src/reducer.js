import {extend, getItemById} from './utils.js';
import {SortType} from './const.js';
import {transformToCities, transformToApartments, transformToReviews} from './adapters/fetch-manager.js';

const initialState = {
  city: null,
  cityList: [],
  apartmentList: [],
  filteredApartmentList: [],
  sortType: SortType.POPULAR,
  reviewList: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  LOAD_CITIES: `LOAD_CITIES`,
  LOAD_APARTMENTS: `LOAD_APARTMENTS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  changeCity: (cityId) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: cityId,
    };
  },
  changeSortType: (selectedType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: selectedType,
    };
  },
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
        const cities = transformToCities(response.data);
        dispatch(ActionCreator.loadCities(cities));
        const apartments = transformToApartments(response.data);
        dispatch(ActionCreator.loadApartments(apartments));
      });
  },
  loadReviews: () => (dispatch, getState, api) => {
    return api.get(`/comments`)
      .then((response) => {
        const reviews = transformToReviews(response.data);
        dispatch(ActionCreator.loadCities(reviews));
      });
  },
};

const sortPlaces = (oldPlaces, sortType) => {
  const places = oldPlaces.slice(0);
  switch (sortType) {
    case SortType.PRICE_LOW:
      return places.sort((a, b) => a.price - b.price);
    case SortType.PRICE_HIGH:
      return places.sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED:
      return places.sort((a, b) => b.rating - a.rating);
    default:
      return places.sort((a, b) => a.id - b.id);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      let updatedApartList = state.apartmentList.filter((x) => x.cityId === action.payload);
      updatedApartList = sortPlaces(updatedApartList, state.sortType);
      return extend(state, {
        city: getItemById(state.cityList, action.payload),
        filteredApartmentList: updatedApartList,
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
        filteredApartmentList: sortPlaces(state.filteredApartmentList, action.payload),
      });
    case ActionType.LOAD_CITIES:
      return extend(state, {
        cities: action.payload,
        cityList: action.payload[0]
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
