import React from 'react';
import {shallow} from 'enzyme';
import ApartmentCard from './apartment-card.jsx';

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
    const onApartmentTitleClickMock = jest.fn();

    const apartmentCardWrapper = shallow(
        <ApartmentCard
          className="cities"
          apartment={SINGLE_APARTMENT}
          onApartmentCardHover={onApartmentCardHoverMock}
          onApartmentTitleClick={onApartmentTitleClickMock}
        />
    );

    const apartmentButton = apartmentCardWrapper.find(`.place-card`);
    const eventMock = {preventDefault() {}};
    apartmentButton.simulate(`mouseEnter`, eventMock);

    expect(onApartmentCardHoverMock).toHaveBeenCalledTimes(1);
    expect(onApartmentCardHoverMock.mock.calls[0][0]).toMatchObject(SINGLE_APARTMENT);
  });
});
