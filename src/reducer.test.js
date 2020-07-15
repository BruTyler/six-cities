import {reducer, ActionCreator} from "./reducer.js";
import {SortType} from "./const.js";

const CITIES = [
  {
    id: `Amsterdam`,
  },
  {
    id: `B`,
  },
];

const APARTMENTS = [
  {
    id: 1,
    cityId: `Amsterdam`,
    type: `Apartment`,
    description: `Beautiful & luxurious apartment at great location`,
    rating: 4.1,
    price: 120.0,
  },
  {
    id: 2,
    cityId: `Amsterdam`,
    type: `Apartment`,
    description: `Canal View Prinsengracht`,
    rating: 3.7,
    price: 80.0,
  },
  {
    id: 3,
    cityId: `Amsterdam`,
    type: `Room`,
    description: `Wood and stone place`,
    rating: 5,
    price: 132.0,
  },
  {
    id: 4,
    cityId: `Amsterdam`,
    type: `Apartment`,
    description: `Nice, cozy, warm big bed apartment`,
    rating: 4.7,
    price: 180.0,
  },
  {
    id: 5,
    cityId: `B`,
    type: `Apartment`,
    rating: 5,
    price: 1800,
  },
];

describe(`Reducer unit- suit`, () => {
  it(`Should change city and update connected apartment list`, () => {
    expect(reducer({
      city: null,
      apartmentList: APARTMENTS,
      cityList: CITIES,
      sortType: SortType.POPULAR,
    }, ActionCreator.changeCity(CITIES[0].id))
    ).toEqual({
      city: CITIES[0],
      apartmentList: APARTMENTS,
      filteredApartmentList: APARTMENTS.filter((x) => x.cityId === CITIES[0].id),
      cityList: CITIES,
      sortType: SortType.POPULAR,
    });
  });

  it(`Should sort offers by price from low`, () => {
    const reducerState = reducer(
        {
          filteredApartmentList: APARTMENTS.filter((x) => x.cityId === CITIES[0].id),
          sortType: SortType.POPULAR,
        },
        ActionCreator.changeSortType(SortType.PRICE_LOW)
    );

    const priceArray = APARTMENTS
      .filter((x) => x.cityId === CITIES[0].id)
      .map((x) => x.price);
    const lowestPrice = Math.min(...priceArray);

    expect(reducerState.filteredApartmentList[0].price).toEqual(lowestPrice);
  });

  it(`Should sort offers by price from high`, () => {
    const reducerState = reducer(
        {
          filteredApartmentList: APARTMENTS.filter((x) => x.cityId === CITIES[0].id),
          sortType: SortType.POPULAR,
        },
        ActionCreator.changeSortType(SortType.PRICE_HIGH)
    );

    const priceArray = APARTMENTS
      .filter((x) => x.cityId === CITIES[0].id)
      .map((x) => x.price);
    const highestPrice = Math.max(...priceArray);

    expect(reducerState.filteredApartmentList[0].price).toEqual(highestPrice);
  });

  it(`Should sort offers by rating`, () => {
    const reducerState = reducer(
        {
          filteredApartmentList: APARTMENTS.filter((x) => x.cityId === CITIES[0].id),
          sortType: SortType.POPULAR,
        },
        ActionCreator.changeSortType(SortType.TOP_RATED)
    );

    const ratingArray = APARTMENTS
      .filter((x) => x.cityId === CITIES[0].id)
      .map((x) => x.rating);
    const bestRating = Math.max(...ratingArray);
    expect(reducerState.filteredApartmentList[0].rating).toEqual(bestRating);
  });
});
