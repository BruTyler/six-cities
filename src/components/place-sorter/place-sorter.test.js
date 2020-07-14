import React from 'react';
import renderer from 'react-test-renderer';
import {SortType} from '../../const.js';
import {PlaceSorter} from './place-sorter.jsx';

describe(`<PlaceSorter /> render suit`, () => {
  it(`<PlaceSorter /> without HOC render sorter`, () => {
    const generatedTree = renderer.create(
        <PlaceSorter
          selectedSortValue={SortType.POPULAR}
          activeItem={false}
          onItemSelect={()=>{}}
          handleSorterItemClick={()=>{}}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
