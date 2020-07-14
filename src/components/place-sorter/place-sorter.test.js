import React from 'react';
import renderer from 'react-test-renderer';
import {SortType} from '../../const.js';
import PlaceSorterWithHOC, {PlaceSorter} from './place-sorter.jsx';

describe(`<PlaceSorter /> render suit`, () => {
  it(`<PlaceSorter /> without HOC render sorter`, () => {
    const generatedTree = renderer.create(
        <PlaceSorter
          selectedSortType={SortType.POPULAR}
          activeItem={false}
          onItemSelect={()=>{}}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`<PlaceSorter /> wrapped by HOC withActiveItem render sorter`, () => {
    const generatedTree = renderer.create(
        <PlaceSorterWithHOC
          selectedSortType={SortType.POPULAR}
          activeItem={false}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});

