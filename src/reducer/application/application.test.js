import {reducer, ActionCreator} from "./application.js";
import {SortType} from "../../const.js";

describe(`Reducer unit- suit`, () => {
  it(`Should change city`, () => {
    expect(reducer({
      cityId: null,
    }, ActionCreator.changeCity(`someCityId`))
    ).toEqual({
      cityId: `someCityId`,
    });
  });

  it(`Should change sort type`, () => {
    expect(reducer({
      sortType: SortType.POPULAR,
    }, ActionCreator.changeSortType(SortType.TOP_RATED))
    ).toEqual({
      sortType: SortType.TOP_RATED,
    });
  });
});