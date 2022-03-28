import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import {reducer} from './reducer';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

