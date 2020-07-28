import {extend, replaceItemById, removeItemById} from '../../utils';
import {transformToCities, transformToApartments, transformToReviews, transformToApartment} from '../../adapters/fetch-manager';

const initialState = {
  cityList: [],
  apartmentList: [],
  reviewList: [],
  apiError: null,
  neighboorApartmentList: [],
  favoriteCities: [],
  favoriteApartments: [],
};

const ActionType = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  LOAD_NEARBY_HOTELS: `LOAD_NEARBY_HOTELS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SET_API_ERROR: `SET_API_ERROR`,
  REPLACE_HOTEL: `REPLACE_HOTEL`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  REMOVE_FAVORITE: `REMOVE_FAVORITE`,
};

const ActionCreator = {
  loadHotels: (cities, apartments) => {
    return {
      type: ActionType.LOAD_HOTELS,
      payload: {cities, apartments},
    };
  },
  loadFavorite: (favoriteCities, favoriteApartments) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: {favoriteCities, favoriteApartments},
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  setApiError: (errorMsg = null) => {
    return {
      type: ActionType.SET_API_ERROR,
      payload: errorMsg,
    };
  },
  replaceHotel: (apartment) => {
    return {
      type: ActionType.REPLACE_HOTEL,
      payload: apartment,
    };
  },
  removeFavorite: (apartment) => {
    return {
      type: ActionType.REMOVE_FAVORITE,
      payload: apartment,
    };
  },
  loadNeighboorHotels: (apartments) => {
    return {
      type: ActionType.LOAD_NEARBY_HOTELS,
      payload: apartments,
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
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
        .then((response) => {
          if (response && response.data) {
            const cities = transformToCities(response.data);
            const apartments = transformToApartments(response.data);
            dispatch(ActionCreator.loadFavorite(cities, apartments));
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
  sendReview: (commentPost) => (dispatch, getState, api) => {
    return api.post(`/comments/${commentPost.apartmentId}`, {
      comment: commentPost.comment,
      rating: commentPost.rating,
    })
    .then((response) => {
      const reviews = transformToReviews(response.data);
      dispatch(ActionCreator.loadReviews(reviews));
    });
  },
  updateFavoriteStatus: (apartment) => (dispatch, getState, api) => {
    const {id, isFavourite} = apartment;
    const newStatus = isFavourite ? 0 : 1;
    return api.post(`/favorite/${id}/${newStatus}`)
        .then((response) => {
          if (response && response.data) {
            const newApartment = transformToApartment(response.data);
            dispatch(ActionCreator.replaceHotel(newApartment));
          }
        });
  },
  removeFavorite: (apartment) => (dispatch, getState, api) => {
    return api.post(`/favorite/${apartment.id}/0`)
        .then((response) => {
          if (response && response.data) {
            const newApartment = transformToApartment(response.data);
            dispatch(ActionCreator.removeFavorite(newApartment));
          }
        });
  },
  loadNeighboorApartments: (apartmentId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${apartmentId}/nearby`)
        .then((response) => {
          if (response && response.data) {
            const neighboorApartments = transformToApartments(response.data);
            dispatch(ActionCreator.loadNeighboorHotels(neighboorApartments));
          }
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
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favoriteCities: action.payload.favoriteCities,
        favoriteApartments: action.payload.favoriteApartments,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviewList: action.payload,
      });
    case ActionType.SET_API_ERROR:
      return extend(state, {
        apiError: action.payload,
      });
    case ActionType.REPLACE_HOTEL:
      return extend(state, {
        apartmentList: replaceItemById(state.apartmentList, action.payload),
        neighboorApartmentList: replaceItemById(state.neighboorApartmentList, action.payload),
      });
    case ActionType.REMOVE_FAVORITE:
      return extend(state, {
        favoriteApartments: removeItemById(state.favoriteApartments, action.payload),
        apartmentList: replaceItemById(state.apartmentList, action.payload),
        neighboorApartmentList: replaceItemById(state.neighboorApartmentList, action.payload),
      });
    case ActionType.LOAD_NEARBY_HOTELS:
      return extend(state, {
        neighboorApartmentList: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
