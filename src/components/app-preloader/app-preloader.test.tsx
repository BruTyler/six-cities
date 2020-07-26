import React from 'react';
import renderer from 'react-test-renderer';
import {AppPreloader} from './app-preloader.jsx';

const EMPTY_HANDLER = () => {};

describe(`<AppPreloader /> render suit`, () => {
  it(`<AppPreloader /> render offline screen`, () => {
    const generatedTree = renderer.create(
        <AppPreloader
          handleFetchingAuth={EMPTY_HANDLER}
          handleFetchingHotels={EMPTY_HANDLER}
          handleLoadingStatus={EMPTY_HANDLER}
          isLoading={true}
          isOffline={true}
          cityList={[]}
          activeCity={{}}
          handleFirstCity={EMPTY_HANDLER}
          handleOfflineStatus={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`<AppPreloader /> render preload (null) screen`, () => {
    const generatedTree = renderer.create(
        <AppPreloader
          handleFetchingAuth={EMPTY_HANDLER}
          handleFetchingHotels={EMPTY_HANDLER}
          handleLoadingStatus={EMPTY_HANDLER}
          isLoading={true}
          isOffline={false}
          cityList={[]}
          activeCity={void 0}
          handleFirstCity={EMPTY_HANDLER}
          handleOfflineStatus={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
