import {reducer, ActionCreator} from "./reducer.js";

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
  },
];

describe(`Reducer unit- suit`, () => {
  it(`Reducer should change city`, () => {
    expect(reducer({
      city: null,
      apartmentList: [],
      cityList: [],
    }, ActionCreator.changeCity(CITY_ID))
    ).toEqual({
      city: CITY,
      apartmentList: APARTMENTS,
      cityList: [],
    });
  });

  it(`Reducer should change apartment list`, () => {
    expect(reducer({
      city: null,
      apartmentList: [],
      cityList: [],
    }, ActionCreator.getOffers(CITY_ID))
    ).toEqual({
      city: null,
      apartmentList: APARTMENTS,
      cityList: [],
    });
  });
});
