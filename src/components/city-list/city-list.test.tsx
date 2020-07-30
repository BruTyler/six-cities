import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CityList from './city-list';
import {City} from '../../types';

const EMPTY_HANDLER = () => null;
const CITIES: City[] = [
  {
    id: `A`,
    location: [1, 2],
    defaultZoom: 12
  },
  {
    id: `C`,
    location: [2, 3],
    defaultZoom: 12
  },
];

describe(`<CityList /> render suit`, () => {
  it(`<CityList /> render city list`, () => {
    const generatedTree = renderer.create(
        <CityList
          cityList={CITIES}
          activeCity={CITIES[0]}
          onCitySelect={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

