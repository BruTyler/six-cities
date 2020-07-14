import {extend, getItemById} from './utils.js';
import {SortType} from './const.js';

const initialState = {
  city: null,
  cityList: [],
  apartmentList: [],
  filteredApartmentList: [],
  sortType: SortType.POPULAR,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
