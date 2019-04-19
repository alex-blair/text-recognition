import React from 'react';
import { Provider } from 'react-redux';

import store from './src/Store';
// import AppNavigator from './navigators/AppNavigator';
import CameraScreen from './src/CameraScreen';

const App = () => {
  return (
    <Provider store={store}>
      <CameraScreen/>
    </Provider>
  );
};

export default App;
