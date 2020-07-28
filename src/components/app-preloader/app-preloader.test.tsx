import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {AppPreloader} from './app-preloader';

const EMPTY_HANDLER = () => null;

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
