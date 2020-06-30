import React from 'react';
import renderer from 'react-test-renderer';
import MainEmpty from './main-empty.jsx';

const EMPTY_HANDLER = () => {};
const CITIES = [
  {
    id: 0,
    title: `A`,
    location: [1, 2],
    defaultZoom: 12
  },
  {
    id: 1,
    title: `C`,
    location: [2, 3],
    defaultZoom: 12
  },
];

describe(`<MainEmpty /> render suit`, () => {
  it(`<MainEmpty /> render special empty screen`, () => {
    const generatedTree = renderer.create(
        <MainEmpty
          cityList={CITIES}
          activeCity={CITIES[0]}
          onCityTitleClick={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

