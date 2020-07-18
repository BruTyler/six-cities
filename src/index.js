import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {createAPI} from './api.js';
import {ActionCreator as UserActionCreator} from './reducer/user/user.js';
import {ActionCreator as DataActionCreator} from './reducer/data/data.js';
import {AuthorizationStatus} from './const.js';

const onUpdateLastApiError = (errorMsg) => {
  store.dispatch(DataActionCreator.setApiError(errorMsg));
};

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized, onUpdateLastApiError);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
