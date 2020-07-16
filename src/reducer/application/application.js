import {extend} from '../../utils.js';
import {SortType} from '../../const.js';

const initialState = {
  cityId: null,
  sortType: SortType.POPULAR,
  isLoading: true,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_LOADING_STATUS: `CHANGE_LOADING_STATUS`,
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
  changeLoadingStatus: (newStatus) => {
    return {
      type: ActionType.CHANGE_LOADING_STATUS,
      payload: newStatus,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        cityId: action.payload,
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });
    case ActionType.CHANGE_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
