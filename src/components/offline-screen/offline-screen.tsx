import * as React from 'react';
import MainEmpty from '../main-empty/main-empty';

const OfflineScreen = () => (
  <div className="page page--gray page--main">
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <MainEmpty
        detailMessage={`Server does not not response. Try again later`}
      />
    </main>
  </div>
);

export default OfflineScreen;
