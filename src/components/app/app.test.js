import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const EMPTY_HANDLER = () => {};
const APARTMENTS = [
  {
    id: 0,
    type: `Apartment`,
    description: `description0`,
    rating: 0.1,
    price: 1,
    isPremium: true,
    isFavourite: true,
    photo: `img0.jpg`,
    photoSet: [`img2.jpg`],
    bedrooms: 3,
    adultsMax: 4,
    goods: [`WiFi`, `TV`],
    host: {
      avatar: `ava.jpg`,
      name: `name`,
      isSuper: true,
    },
  },
];

describe(`<App /> render suit`, () => {
  it(`<App /> render apartment list`, () => {
    const generatedTree = renderer.create(
        <App
          apartmentList={APARTMENTS}
          onApartmentTitleClick={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
