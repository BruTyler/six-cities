import {extend} from '../../utils';
import {SortType} from '../../const';

const initialState = {
  cityId: null,
  sortType: SortType.POPULAR,
  isLoading: true,
  isOffline: false,
  apartmentId: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_APARTMENT: `CHANGE_APARTMENT`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_LOADING_STATUS: `CHANGE_LOADING_STATUS`,
  CHANGE_OFFLINE_STATUS: `CHANGE_OFFLINE_STATUS`,
};

const ActionCreator = {
  changeCity: (cityId) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: cityId,
    };
  },
  changeApartment: (apartmentId) => {
    return {
      type: ActionType.CHANGE_APARTMENT,
      payload: apartmentId,
    };
  },
  changeSortType: (selectedType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: selectedType,
    };
  },
  changeLoadingStatus: (newStatus) => {
    return {
      type: ActionType.CHANGE_LOADING_STATUS,
      payload: newStatus,
    };
  },
  setOffline: () => {
    return {
      type: ActionType.CHANGE_OFFLINE_STATUS,
      payload: true,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        cityId: action.payload,
      });
    case ActionType.CHANGE_APARTMENT:
      return extend(state, {
        apartmentId: action.payload,
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });
    case ActionType.CHANGE_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload,
      });
    case ActionType.CHANGE_OFFLINE_STATUS:
      return extend(state, {
        isOffline: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
