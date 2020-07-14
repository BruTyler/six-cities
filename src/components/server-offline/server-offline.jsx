import React from 'react';
import MainEmpty from '../main-empty/main-empty';

const ServerOffline = () => (
  <div className="page page--gray page--main">
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <MainEmpty activeCity={null}/>
    </main>
  </div>
);

export default ServerOffline;
