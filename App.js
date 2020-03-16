import React from 'react';
import { Provider } from 'react-redux';

import Display from './display';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Display />
    </Provider>
  );
};

export default App;
