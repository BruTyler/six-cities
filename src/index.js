import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const RENTCOUNT = 99;

const init = () => {
  ReactDOM.render(
      <App rentCount={RENTCOUNT} />,
      document.querySelector(`#root`)
  );
};

init();
