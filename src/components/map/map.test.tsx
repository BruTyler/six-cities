import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Map from './map';
import {MapEnvironment} from '../../const';

const CITY = {
  defaultZoom: 1,
  location: [56, 48],
};

const APARTMENTS = [
  {
    id: 0,
    location: [56.1, 48.1],
  },
  {
    id: 1,
    location: [56.2, 48.2],
  }
];

describe(`<Map /> render suit`, () => {
  it(`<Map /> render pin list of apartments`, () => {

    const generatedTree = renderer.create(
        <Map
          apartmentList={APARTMENTS}
          city={CITY}
          parentBox={MapEnvironment.MAIN_WINDOW}
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
