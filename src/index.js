import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import ApartmentContentMock from './mocks/offers.js';
import CitiesMock from './mocks/cities.js';
import reducer from './reducer/js';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          apartmentList = {ApartmentContentMock}
          cities = {CitiesMock}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
