import {reducer, ActionCreator} from "./reducer.js";
import {SortType} from "./const.js";

const CITY_ID = 0;
const CITY = {
  id: 0,
  title: `Amsterdam`,
  location: [52.38333, 4.9],
  defaultZoom: 12
};

const APARTMENTS = [
  {
    id: 1,
    cityId: 0,
    type: `Apartment`,
    description: `Beautiful & luxurious apartment at great location`,
    rating: 4.1,
    price: 120.0,
    isPremium: true,
    isFavourite: true,
    photo: `img/room.jpg`,
    photoSet: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
    ],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    host: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: true,
    },
    location: [52.3909553943508, 4.85309666406198],
    reviews: [
      {
        id: 1,
        authorName: `Max`,
        authorAvatar: `img/avatar-max.jpg`,
        rating: 4,
        opinion: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
        publishDate: `2014-05-20`,
      },
    ],
  },
  {
    id: 2,
    cityId: 0,
    type: `Apartment`,
    description: `Canal View Prinsengracht`,
    rating: 3.7,
    price: 80.0,
    isPremium: false,
    isFavourite: false,
    photo: `img/apartment-01.jpg`,
    photoSet: [
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
    ],
    bedrooms: 4,
    adultsMax: 7,
    goods: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
    host: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Katerina`,
      isSuper: true,
    },
    location: [52.369553943508, 4.85309666406198],
    reviews: [],
  },
  {
    id: 3,
    cityId: 0,
    type: `Private room`,
    description: `Wood and stone place`,
    rating: 5,
    price: 132.0,
    isPremium: false,
    isFavourite: true,
    photo: `img/apartment-02.jpg`,
    photoSet: [
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    bedrooms: 2,
    adultsMax: 3,
    goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`],
    host: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Carla`,
      isSuper: true,
    },
    location: [52.3909553943508, 4.929309666406198],
    reviews: [],
  },
  {
    id: 4,
    cityId: 0,
    type: `Apartment`,
    description: `Nice, cozy, warm big bed apartment`,
    rating: 4.7,
    price: 180.0,
    isPremium: false,
    isFavourite: true,
    photo: `img/apartment-03.jpg`,
    photoSet: [
      `img/room.jpg`,
    ],
    bedrooms: 1,
    adultsMax: 1,
    goods: [`Kitchen`],
    host: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Elena`,
      isSuper: false,
    },
    location: [52.3809553943508, 4.939309666406198],
    reviews: []
  },
];

describe(`Reducer unit- suit`, () => {
  it(`Should change city and update connected apartment list`, () => {
    expect(reducer({
      city: null,
      apartmentList: [],
      cityList: [],
      sortType: SortType.POPULAR,
      isServerOnline: true,
    }, ActionCreator.changeCity(CITY_ID))
    ).toEqual({
      city: CITY,
      apartmentList: APARTMENTS,
      cityList: [],
      sortType: SortType.POPULAR,
      isServerOnline: true,
    });
  });

  it(`Should sort offers by price from low`, () => {
    const reducerState = reducer(
        {
          city: CITY,
          apartmentList: APARTMENTS.filter((x) => x.cityId === CITY.id),
          cityList: [],
          sortType: SortType.POPULAR,
          isServerOnline: true,
        },
        ActionCreator.changeSortType(SortType.PRICE_LOW)
    );

    const priceArray = APARTMENTS
      .filter((x) => x.cityId === CITY.id)
      .map((x) => x.price);
    const expectedFirstPrice = Math.min(...priceArray);

    expect(reducerState.apartmentList[0].price).toEqual(expectedFirstPrice);
  });

  it(`Should sort offers by price from high`, () => {
    const reducerState = reducer(
        {
          city: CITY,
          apartmentList: APARTMENTS.filter((x) => x.cityId === CITY.id),
          cityList: [],
          sortType: SortType.POPULAR,
          isServerOnline: true,
        },
        ActionCreator.changeSortType(SortType.PRICE_HIGH)
    );

    const priceArray = APARTMENTS
      .filter((x) => x.cityId === CITY.id)
      .map((x) => x.price);
    const expectedFirstPrice = Math.max(...priceArray);

    expect(reducerState.apartmentList[0].price).toEqual(expectedFirstPrice);
  });

  it(`Should sort offers by rating`, () => {
    const reducerState = reducer(
        {
          city: CITY,
          apartmentList: APARTMENTS.filter((x) => x.cityId === CITY.id),
          cityList: [],
          sortType: SortType.POPULAR,
          isServerOnline: true,
        },
        ActionCreator.changeSortType(SortType.TOP_RATED)
    );

    const ratingArray = APARTMENTS
      .filter((x) => x.cityId === CITY.id)
      .map((x) => x.rating);
    const expectedTopRating = Math.max(...ratingArray);
    expect(reducerState.apartmentList[0].rating).toEqual(expectedTopRating);
  });

  it(`Should change server status`, () => {
    expect(reducer({
      city: null,
      apartmentList: [],
      cityList: [],
      sortType: SortType.POPULAR,
      isServerOnline: true,
    }, ActionCreator.updateServerStatus(false))
    ).toEqual({
      city: null,
      apartmentList: [],
      cityList: [],
      sortType: SortType.POPULAR,
      isServerOnline: false,
    });
  });
});
