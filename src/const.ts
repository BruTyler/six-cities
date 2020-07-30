export enum PlaceType {
  APARTMENT = `Apartment`,
  ROOM = `Private room`,
  HOUSE = `House`,
  HOTEL = `Hotel`,
};

export enum SortType {
  POPULAR = `Popular`,
  PRICE_LOW = `Price: low to high`,
  PRICE_HIGH = `Price: high to low`,
  TOP_RATED = `Top rated first`,
};

export enum AuthorizationStatus {
  NO_AUTH = `NO_AUTH`,
  AUTH = `AUTH`,
};

export enum BuisnessRequirements {
  MAX_PHOTOS_PER_APARTMENT = 6,
  MAX_REVIEWS_PER_APARTMENT = 10,
  MIN_REVIEW_TEXT_LENGTH = 50,
  MAX_REVIEW_TEXT_LENGTH = 300,
};

export enum AppRoute {
  AUTH = `/login`,
  ROOT = `/`,
  FAVORITES = `/favorites`,
  PROPERTY_WITH_ID = `/offer/:id`,
};

export enum ApartmentEnvironment {
  FAVORITE = `favorites`,
  NEARBY_PLACES = `near-places`,
  MAIN_WINDOW = `cities`
};

export enum MapEnvironment {
  NEARBY_PLACES = `property__map`,
  MAIN_WINDOW = `cities__map`
};
