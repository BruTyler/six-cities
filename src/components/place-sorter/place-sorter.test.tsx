import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {SortType} from '../../const';
import {PlaceSorter} from './place-sorter';

describe(`<PlaceSorter /> render suit`, () => {
  it(`<PlaceSorter /> without HOC render sorter`, () => {
    const generatedTree = renderer.create(
        <PlaceSorter
          selectedSortValue={SortType.POPULAR}
          activeItem={false}
          onItemSelect={()=>null}
          handleSorterItemClick={()=>null}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
