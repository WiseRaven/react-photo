import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { BrowserRouter } from "react-router-dom";

import PhotoStatusWatcher from './containers/PhotoStatusWatcher';
import MainScreenLayout from './layouts/MainScreenLayout';
import WithUser from './containers/WithUser';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose
));

function App() {

  return (
    <Provider store={store}>
      <PhotoStatusWatcher>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <WithUser><MainScreenLayout /></WithUser>
        </BrowserRouter>
      </PhotoStatusWatcher>
    </Provider>
  );
}

export default App;
