import * as React from 'react';
import {shallow} from 'enzyme';
import {ApartmentCard} from './apartment-card';
import {AuthorizationStatus, ApartmentEnvironment, PlaceType} from '../../const';
import {SingleApartment} from '../../types';

const SINGLE_APARTMENT: SingleApartment = {
  id: 0,
  cityId: `Amsterdam`,
  type: PlaceType.APARTMENT,
  description: `description0`,
  fullDescription: `d1`,
  rating: 0.1,
  price: 1,
  isPremium: true,
  isFavourite: true,
  photo: `img0.jpg`,
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

describe(`<ApartmentCard /> e2e suite`, () => {
  it(`<ApartmentCard /> Card send apartment info on mouse enter`, () => {
    const onApartmentCardHoverMock = jest.fn();

    const apartmentCardWrapper = shallow(
        <ApartmentCard
          parentBox={ApartmentEnvironment.MAIN_WINDOW}
          apartment={SINGLE_APARTMENT}
          onApartmentCardHover={onApartmentCardHoverMock}
          authStatus={AuthorizationStatus.AUTH}
          handleFavoriteStatusChange={() => null}
        />
    );

    const apartmentButton = apartmentCardWrapper.find(`.place-card`);
    apartmentButton.simulate(`mouseEnter`);

    expect(onApartmentCardHoverMock).toHaveBeenCalledTimes(1);
    expect(onApartmentCardHoverMock.mock.calls[0][0]).toMatchObject(SINGLE_APARTMENT);
  });
});
