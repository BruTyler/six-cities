import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {ApartmentCard} from './apartment-card';
import {AuthorizationStatus, ApartmentEnvironment, PlaceType} from '../../const';
import {SingleApartment} from '../../types';

const EMPTY_HANDLER = () => null;
const SINGLE_APARTMENT: SingleApartment = {
  id: 1,
  cityId: `A`,
  type: PlaceType.ROOM,
  description: `de1`,
  fullDescription: `d1`,
  rating: 1,
  price: 2,
  isPremium: false,
  isFavourite: false,
  photo: `img1.jpg`,
  photoSet: [],
  bedrooms: 3,
  adultsMax: 4,
  goods: [`Wi-Fi`],
  host: {
    avatar: `img.jpg`,
    name: `A`,
    isSuper: true,
  },
  location: [1, 2],
};

describe(`<ApartmentCard /> render suit`, () => {
  it(`<ApartmentCard /> render single apartment`, () => {
    const generatedTree = renderer.create(
        <ApartmentCard
          parentBox={ApartmentEnvironment.MAIN_WINDOW}
          apartment={SINGLE_APARTMENT}
          onApartmentCardHover={EMPTY_HANDLER}
          authStatus={AuthorizationStatus.AUTH}
          handleFavoriteStatusChange={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
