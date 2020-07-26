import * as React from 'react';
import {shallow} from 'enzyme';
import {ApartmentCard} from './apartment-card';
import {AuthorizationStatus, ApartmentEnvironment} from '../../const';

const SINGLE_APARTMENT = {
  id: 0,
  type: `Apartment`,
  description: `description0`,
  rating: 0.1,
  price: 1,
  isPremium: true,
  isFavourite: true,
  photo: `img0.jpg`
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
          handleFavoriteStatusChange={() => {}}
        />
    );

    const apartmentButton = apartmentCardWrapper.find(`.place-card`);
    apartmentButton.simulate(`mouseEnter`);

    expect(onApartmentCardHoverMock).toHaveBeenCalledTimes(1);
    expect(onApartmentCardHoverMock.mock.calls[0][0]).toMatchObject(SINGLE_APARTMENT);
  });
});