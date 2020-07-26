import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import AppPreloader from './components/app-preloader/app-preloader';
import reducer from './reducer/reducer';
import {createAPI} from './api';
import {ActionCreator as UserActionCreator} from './reducer/user/user';
import {ActionCreator as DataActionCreator} from './reducer/data/data';
import {AuthorizationStatus} from './const';

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
        <AppPreloader />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
