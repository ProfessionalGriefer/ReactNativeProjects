import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, platform } from 'react-native';
import { Container, Content, Left, Right, Header, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory-native';
import _ from 'lodash';

import { updateMaximum, updateRoot, updateDataRocket, updateDataBallistic } from '../redux/actions';

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
const Chart = ({ domain, zoomDomain, dataRocket, dataBallistic }) => (
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
      data={dataRocket}
    />
    <VictoryLine
      style={{
        data: { stroke: 'green', strokeWidth: 4 } // #c43a31
      }}
      domain={domain}
      data={dataBallistic}
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
  }).isRequired,
  dataRocket: PropTypes.array.isRequired,
  dataBallistic: PropTypes.array.isRequired
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
  const { input } = useSelector(state => ({ ...state }));
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
      alpha = toRadians(input.projectile.angle),
      h = input.projectile.height,
      vex = input.rocket.exhaustVelocity,
      m0 = input.rocket.initialMass,
      m1 = input.rocket.finalMass,
      mf = input.rocket.massFlowRate,
      g = input.projectile.gravity
    ) => {
      const burnTime = (m0 - m1) / mf;
      const deltaV = vex * Math.log(m0 / mf);
      const dataRocket = [];
      const dataBallistic = [];
      const sample = 200;
      let sx;
      let sy;
      let lastX;
      let lastY;
      let t2 = 0;
      let angle;
      for (let t = 0; t <= sample; t += 0.1) {
        if (t < burnTime) {
          sx = Math.cos(alpha) * vex * (t - (t - m0 / mf) * Math.log(1 - (mf * t) / m0));
          sy =
            Math.sin(alpha) * vex * (t - (t - m0 / mf) * Math.log(1 - (mf * t) / m0)) -
            0.5 * g * t ** 2 +
            h;
          lastX = sx;
          lastY = sy;
          dataRocket.push({ x: sx, y: sy });
        } else {
          angle = Math.atan(
            (dataRocket[dataRocket.length - 1].y - dataRocket[dataRocket.length - 2].y) /
              (dataRocket[dataRocket.length - 1].x - dataRocket[dataRocket.length - 2].x)
          );
          sx = deltaV * Math.cos(angle) * t2 + lastX;
          sy = deltaV * Math.sin(angle) * t2 - 0.5 * g * t2 ** 2 + lastY;
          sy = sy < 0 ? 0 : sy;
          dataBallistic.push({ x: sx, y: sy });
          t2 += 0.1;
        }
      }

      const max = _.maxBy(dataBallistic, _.iteratee('y'));
      const maxIndex = dataBallistic.findIndex(element => element === max);
      const root = _.minBy(dataBallistic.slice(maxIndex), _.iteratee('y'));

      dispatch(updateDataRocket(dataRocket));
      dispatch(updateDataBallistic(dataBallistic));
      dispatch(updateMaximum(max));
      dispatch(updateRoot(root));
    };
    chartData();
  }, [input]);

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
        <Chart
          dataRocket={info.dataRocket}
          dataBallistic={info.dataBallistic}
          domain={{ x: [0, info.root.x + 10], y: [-10, info.maximum.y + 10] }}
          zoomDomain={{ x: [0, info.maximum.y + 10], y: [-10, info.maximum.y + 10] }}
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
