import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, platform } from 'react-native';
import { Container, Content, Left, Right, Header, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory-native';
import _ from 'lodash';

import {
  updateMaximum,
  updateMinimum,
  updateTime,
  updateDataVelocity,
  updateDataHeight
} from '../redux/actions';

const { width, height } = Dimensions.get('window');
const headerHeight = platform === 'ios' ? 64 : 56;

const Roboto = require('native-base/Fonts/Roboto.ttf');
// eslint-disable-next-line camelcase
const Roboto_medium = require('native-base/Fonts/Roboto_medium.ttf');

const styles = StyleSheet.create({
  size: 30,
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
const Chart = ({ domain, zoomDomain, dataVelocity, dataHeight }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    style={{ parent: { height: '100%' } }}
    height={styles.svgView.height}
    scale={{ x: 'linear', y: 'linear' }}
    containerComponent={<VictoryZoomContainer zoomDomain={zoomDomain} />}
  >
    <VictoryLine
      style={{
        data: { stroke: 'red', strokeWidth: 4 } // #c43a31
      }}
      domain={domain}
      data={dataVelocity}
    />
    <VictoryLine
      style={{
        data: { stroke: 'green', strokeWidth: 4 } // #c43a31
      }}
      domain={domain}
      data={dataHeight}
    />
  </VictoryChart>
);

Chart.propTypes = {
  domain: PropTypes.shape({
    x: PropTypes.array.isRequired,
    y: PropTypes.array.isRequired
  }).isRequired,
  zoomDomain: PropTypes.shape({
    x: PropTypes.array.isRequired,
    y: PropTypes.array.isRequired
  }).isRequired
};

const drawerIcon = ({ tintColor }) => <Icon size={30} name="md-home" color={tintColor} />;
drawerIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const MainScreen = props => {
  MainScreen.navigationOptions = {
    drawerIcon
  };
  const [loading, setLoading] = useState(true);
  const { inputRocket, inputProjectile } = useSelector(state => ({ ...state }));
  const { info } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto,
        Roboto_medium
      });
      setLoading(false);
    }
    loadFonts();

    const chartData = (
      v = inputProjectile.velocity,
      h = inputProjectile.height,
      vex = inputRocket.exhaustVelocity,
      m0 = inputRocket.initialMass,
      m1 = inputRocket.finalMass,
      mf = inputRocket.massFlowRate,
      g = inputProjectile.gravity
    ) => {
      const burnTime = (m0 - m1) / mf;
      const totalTime = burnTime + 720;
      const dataVelocity = [];
      const dataHeight = [];
      let vt;
      let st;
      if (inputRocket.checked) {
        for (let t = 0; t <= totalTime; t += 0.5) {
          if (t <= burnTime) {
            vt = vex * Math.log(m0 / (m0 - mf * t)) - g * t;
            st =
              (-(vex * (m0 - mf * t)) / mf) * Math.log(m0 / (m0 - mf * t)) +
              vex * t -
              0.5 * g * t ** 2;
          } else {
            vt = vex * Math.log(m0 / m1) - g * t;
            st = (-(vex * m1) / mf) * Math.log(m0 / m1) + vex * t - 0.5 * g * t ** 2;
            if (st < 0) {
              break;
            }
          }
          dataVelocity.push({ x: t, y: vt });
          dataHeight.push({ x: t, y: st });
        }
      } else {
        for (let t = 0; t <= totalTime; t += 0.2) {
          vt = v - g * t;
          st = h + v * t - 0.5 * g * t ** 2;
          if (st < 0) {
            break;
          }
          dataVelocity.push({ x: t, y: vt });
          dataHeight.push({ x: t, y: st });
        }
      }

      const maxHeight = _.maxBy(dataHeight, _.iteratee('y'));
      const maxVelocity = _.maxBy(dataVelocity, _.iteratee('y'));
      const max = maxHeight.y > maxVelocity.y ? maxHeight : maxVelocity;
      const min = _.minBy(dataVelocity, _.iteratee('y')).y;
      const time = _.maxBy(dataHeight, _.iteratee('x')).x;

      dispatch(updateDataVelocity(dataVelocity));
      dispatch(updateDataHeight(dataHeight));
      dispatch(updateMaximum(max));
      dispatch(updateMinimum(min));
      dispatch(updateTime(time));
    };
    chartData();
  }, [inputRocket, inputProjectile]);

  if (loading) {
    return <AppLoading />;
  }
  return (
    <Container>
      <View style={{ height: Constants.statusBarHeight }} />
      <Header>
        <Left>
          <Icon size={styles.size} name="md-menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
      </Header>
      <Content contentContainerStyle={[StyleSheet.absoluteFill, styles.svgView]}>
        <Chart
          dataVelocity={info.dataVelocity}
          dataHeight={info.dataHeight}
          domain={{ x: [0, info.time], y: [info.minimum, info.maximum.y + 10] }}
          zoomDomain={{ x: [0, info.time], y: [info.minimum, info.maximum.y + 10] }}
        />
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
