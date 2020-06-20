import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import ApartmentContentMock from './mocks/offers.js';

const init = () => {
  ReactDOM.render(
      <App apartmentList = {ApartmentContentMock}/>,
      document.querySelector(`#root`)
  );
};

init();
