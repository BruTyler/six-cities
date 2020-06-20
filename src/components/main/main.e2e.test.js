import React from 'react';
import {mount} from 'enzyme';
import Main from './main.jsx';

describe(`<Main /> e2e suite`, () => {
  it(`<Main /> Apartment title is pressed`, () => {
    const onApartmentTitleHandler = jest.fn();
    const apartmentList = [
      {
        id: 0,
        type: `Apartment`,
        description: `description0`,
        rating: 0.1,
        price: 1,
        isPremium: true,
        isFavourite: true,
        photo: `img0.jpg`
      },
      {
        id: 1,
        type: `Private room`,
        description: `description1`,
        rating: 1,
        price: 2,
        isPremium: false,
        isFavourite: false,
        photo: `img1.jpg`
      }
    ];

    const mainWrapper = mount(
        <Main
          apartmentList={apartmentList}
          onApartmentTitleClick={onApartmentTitleHandler}
        />
    );

    const apartmentButtons = mainWrapper.find(`.place-card__name > a`);
    apartmentButtons.at(0).simulate(`click`, {preventDefault() {}});

    expect(apartmentButtons.length).toBe(2);
    expect(onApartmentTitleHandler.mock.calls.length).toBe(1);
  });
});
