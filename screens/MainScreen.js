import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, platform } from 'react-native';
import { Container, Content, Left, Right, Header, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory-native';

const { width, height } = Dimensions.get('window');
const headerHeight = platform === 'ios' ? 64 : 56;

const Roboto = require('native-base/Fonts/Roboto.ttf');
// eslint-disable-next-line camelcase
const Roboto_medium = require('native-base/Fonts/Roboto_medium.ttf');

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold'
  },
  svgView: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: height - headerHeight - Constants.statusBarHeight
  }
});
const toRadians = angle => {
  return angle * (Math.PI / 180);
};
const Chart = ({ domain, func }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    style={{ parent: { height: '100%' } }}
    height={styles.svgView.height}
    containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 100], y: [0, 100] }} />}
  >
    <VictoryLine
      style={{
        data: { stroke: '#c43a31', strokeWidth: 4 },
        parent: { border: '1px solid #ccc' }
      }}
      height={5000}
      samples={100}
      size={5}
      domain={domain}
      y={data => (func(data.x) >= 0 ? func(data.x) : 0)}
    />
  </VictoryChart>
);

Chart.propTypes = {
  domain: PropTypes.shape({
    x: PropTypes.array.isRequired,
    y: PropTypes.array.isRequired
  }).isRequired,
  func: PropTypes.func.isRequired
};

const drawerIcon = ({ tintColor }) => <Icon name="home" style={{ color: tintColor }} />;
drawerIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const MainScreen = props => {
  MainScreen.navigationOptions = {
    drawerIcon
  };
  const [loading, setLoading] = useState(true);
  const { input } = useSelector(state => ({
    ...state
  }));
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto,
        Roboto_medium
      });
      setLoading(false);
    }
    loadFonts();
  }, []);

  // für Taschenrechner: -0.5 * (g / (v*v * cos(alpha)*cos(alpha) ) ) * x*x + tan(alpha) * x + h;
  const wurfParabel = (
    x,
    v = input.velocity,
    alpha = input.angle,
    h = input.height,
    g = input.gravitation
  ) => {
    return (
      -0.5 * (g / (v * v * Math.cos(toRadians(alpha)) ** 2)) * x * x +
      Math.tan(toRadians(alpha)) * x +
      h
    );
  };

  if (loading) {
    return <AppLoading />;
  }
  return (
    <Container>
      <View style={{ height: Constants.statusBarHeight }} />
      <Header>
        <Left>
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
      </Header>
      <Content contentContainerStyle={[StyleSheet.absoluteFill, styles.svgView]}>
        <Chart func={wurfParabel} domain={{ x: [0, 200], y: [0, 100] }} />
      </Content>
    </Container>
  );
};

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired
  }).isRequired
};

export default MainScreen;
