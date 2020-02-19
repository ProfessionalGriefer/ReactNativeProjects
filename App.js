import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


import store from './redux/store';
import MainScreen from './screens/MainScreen';

const MainStack = createStackNavigator(
  {
    Home: MainScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

const MainStackNavigator = createAppContainer(MainStack);

export default function App() {
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
