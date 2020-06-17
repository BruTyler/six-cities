import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const APARTMENTS = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

const init = () => {
  ReactDOM.render(
      <App apartmentList = {APARTMENTS}/>,
      document.querySelector(`#root`)
  );
};

init();
