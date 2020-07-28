import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Map from './map';
import {MapEnvironment, PlaceType} from '../../const';
import {City, SingleApartment} from '../../types';

const CITY: City = {
  id: `CityId`,
  defaultZoom: 1,
  location: [56, 48],
};

const APARTMENTS: SingleApartment[] = [
  {
    id: 0,
    location: [56.1, 48.1],
    cityId: `Amsterdam`,
    type: PlaceType.APARTMENT,
    description: `d0`,
    fullDescription: `d1`,
    rating: 4,
    price: 120,
    isPremium: true,
    isFavourite: true,
    photo: `img.jpg`,
    photoSet: [],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`],
    host: {
      avatar: `img.jpg`,
      name: `A`,
      isSuper: true,
    },
  },
  {
    id: 1,
    location: [56.2, 48.2],
    cityId: `Amsterdam`,
    type: PlaceType.APARTMENT,
    description: `d0`,
    fullDescription: `d1`,
    rating: 4,
    price: 120,
    isPremium: true,
    isFavourite: true,
    photo: `img.jpg`,
    photoSet: [],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`Wi-Fi`],
    host: {
      avatar: `img.jpg`,
      name: `A`,
      isSuper: true,
    },
  }
];

describe(`<Map /> render suit`, () => {
  it(`<Map /> render pin list of apartments`, () => {
    const generatedTree = renderer.create(
        <Map
          apartmentList={APARTMENTS}
          city={CITY}
          parentBox={MapEnvironment.MAIN_WINDOW}
        />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
