import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Image, View } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants';

import store from './redux/store';
import MainScreen from './screens/MainScreen';
import InputScreen from './screens/InputScreen';

const icon = require('./assets/icon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drawerIcon: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  iconContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: Constants.statusBarHeight }} />
    <View style={styles.iconContainer}>
      <Image style={styles.drawerIcon} source={icon} />
    </View>
    <ScrollView>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const MainDrawer = createDrawerNavigator(
  {
    Home: MainScreen,
    Input: InputScreen
    // Share,
    // Settings,
    // Help
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: 'red'
    }
  }
);

const MainStackNavigator = createAppContainer(MainDrawer);

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    );
  }
}
