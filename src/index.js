import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import ApartmentContentMock from './mocks/offers.js';
import CitiesMock from './mocks/cities.js';

const init = () => {
  ReactDOM.render(
      <App
        apartmentList = {ApartmentContentMock}
        cities = {CitiesMock}/>,
      document.querySelector(`#root`)
  );
};

init();
