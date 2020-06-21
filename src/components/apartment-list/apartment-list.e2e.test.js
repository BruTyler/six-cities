import React from 'react';
import {mount} from 'enzyme';
import ApartmentList from './apartment-list.jsx';

describe(`<ApartmentList /> e2e suite`, () => {
  it(`<ApartmentList /> Send apartment info on title click`, () => {
    const onApartmentTitleClickMock = jest.fn();
    const apartmentsMock = [
      {
        id: 0,
        type: `Apartment`,
        description: `description0`,
        rating: 0.1,
        price: 1,
        isPremium: true,
        isFavourite: true,
        photo: `img1.jpg`,
        photoSet: [`img1.jpg`],
        bedrooms: 3,
        adultsMax: 4,
        goods: [`WiFi`, `TV`],
        host: {
          avatar: `ava.jpg`,
          name: `name`,
          isSuper: true,
        },
      },
      {
        id: 1,
        type: `Apartment`,
        description: `description1`,
        rating: 1,
        price: 2,
        isPremium: false,
        isFavourite: false,
        photo: `img2.jpg`,
        photoSet: [`img2.jpg`],
        bedrooms: 3,
        adultsMax: 4,
        goods: [`WiFi`],
        host: {
          avatar: `ava2.jpg`,
          name: `name`,
          isSuper: false,
        },
      },
    ];

    const apartmentCardWrapper = mount(
        <ApartmentList
          apartmentList={apartmentsMock}
          onApartmentTitleClick={onApartmentTitleClickMock}
        />
    );

    const apartmentTitleHrefs = apartmentCardWrapper.find(`.place-card__name > a`);
    apartmentTitleHrefs.at(1).simulate(`click`);
    const expectedApartment = apartmentsMock[1];

    expect(apartmentTitleHrefs.length).toBe(apartmentsMock.length);
    expect(onApartmentTitleClickMock).toHaveBeenCalledTimes(1);
    expect(onApartmentTitleClickMock.mock.calls[0][0]).toMatchObject(expectedApartment);
  });
});
