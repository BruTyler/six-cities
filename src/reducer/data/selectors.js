import {createSelector} from 'reselect';
import NameSpace from '../name-space.js';
import {SortType, BuisnessRequirements} from '../../const.js';
import {getItemById, comparator} from '../../utils.js';

export const getReviews = (state) => {
  return state[NameSpace.DATA]
    .reviewList
    .sort((a, z) => comparator(z, a, `publishDate`))
    .slice(0, BuisnessRequirements.MAX_REVIEWS_PER_APARTMENT);
};

export const getCities = (state) => state[NameSpace.DATA].cityList;
export const getApiError = (state) => state[NameSpace.DATA].apiError;
export const getNeighboorApartments = (state) => state[NameSpace.DATA].neighboorApartmentList;
export const getFavoriteCities = (state) => state[NameSpace.DATA].favoriteCities;
export const getFavoriteApartments = (state) => state[NameSpace.DATA].favoriteApartments;

const _sortTypeSelector = (state) => state[NameSpace.APPLICATION].sortType;
const _cityIdSelector = (state) => state[NameSpace.APPLICATION].cityId;
const _apartmentIdSelector = (state) => state[NameSpace.APPLICATION].apartmentId;
const _allApartmentsSelector = (state) => state[NameSpace.DATA].apartmentList;

export const getApartmentList = createSelector(
    _sortTypeSelector,
    _cityIdSelector,
    _allApartmentsSelector,
    (sortType, cityId, allApartments) => {
      let filteredApartList = allApartments.filter((x) => x.cityId === cityId);
      filteredApartList = sortPlaces(filteredApartList, sortType);
      return filteredApartList;
    }
);

export const getCity = createSelector(
    getCities,
    _cityIdSelector,
    (cities, cityId) => getItemById(cities, cityId)
);

export const getApartment = createSelector(
    _allApartmentsSelector,
    _apartmentIdSelector,
    (apartments, apartmentId) => getItemById(apartments, apartmentId)
);

const sortPlaces = (oldPlaces, sortType) => {
  const places = oldPlaces.slice(0);
  switch (sortType) {
    case SortType.PRICE_LOW:
      return places.sort((a, z) => comparator(a, z, `price`));
    case SortType.PRICE_HIGH:
      return places.sort((a, z) => comparator(z, a, `price`));
    case SortType.TOP_RATED:
      return places.sort((a, z) => comparator(z, a, `rating`));
    default:
      return places.sort((a, z) => comparator(a, z, `id`));
  }
};
