import React from 'react';
import renderer from 'react-test-renderer';
import Property from './property.jsx';

const EMPTY_HANDLER = () => {};
const CITY = {
  id: `Amsterdam`,
  location: [1, 1],
  defaultZoom: 1,
};
const SINGLE_APARTMENT = {
  id: 1,
  type: `Private room`,
  description: `description1`,
  fullDescription: `full description1`,
  rating: 1,
  price: 2,
  isPremium: false,
  isFavourite: false,
  photo: `img0.jpg`,
  photoSet: [
    `img1.jpg`,
    `img2.jpg`,
  ],
  bedrooms: 3,
  adultsMax: 4,
  goods: [`WiFi`, `TV`],
  host: {
    avatar: `ava.jpg`,
    name: `name`,
    isSuper: true,
  },
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
  location: [1, 1],
};

describe(`<Property /> render suit`, () => {
  it(`<Property /> render single apartment`, () => {
    const generatedTree = renderer.create(
        <Property
          city={CITY}
          onApartmentTitleClick={EMPTY_HANDLER}
          neighboorApartmentList={[SINGLE_APARTMENT]}
          apartment={SINGLE_APARTMENT}
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
