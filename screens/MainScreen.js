import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Dimensions, platform } from 'react-native';
import { Container, Content, Left, Right, Header, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
// expo r -c        Wie konnte das den Bug stoppen???
// https://stackoverflow.com/questions/60177995/react-native-svg-foreignobject-element-not-found-react-native-expo-typescri
// import Svg, { Circle, Rect } from 'react-native-svg';
// import * as d3 from 'd3';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory-native';

const { width, height } = Dimensions.get('window');
const headerHeight = platform === 'ios' ? 64 : 56;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold'
  },
  svgView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height - headerHeight - Constants.statusBarHeight
  }
});

class MainScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => <Icon name="home" style={{ color: tintColor }} />
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ loading: false });
  }
  toRadians = angle => {
    return angle * (Math.PI / 180);
  };
  wurfParabel = (
    x,
    v = this.props.input.velocity,
    alpha = this.props.input.angle,
    h = this.props.input.height,
    g = this.props.input.gravitation
  ) => {
    // für Taschenrechner: -0.5 * (g / (v*v * cos(alpha)*cos(alpha) ) ) * x*x + tan(alpha) * x + h;
    return (
      -0.5 * (g / (v * v * Math.pow(Math.cos(this.toRadians(alpha)), 2))) * x * x +
      Math.tan(this.toRadians(alpha)) * x +
      h
    );
  };
  getData = info => {
    console.log(info);
    return [
      { x: 1, y: 2 },
      { x: 3, y: 5 }
    ];
  };

  render() {
    let data = [];
    let y = 0;
    for (let i = 0; i <= 100; i++) {
      y = this.wurfParabel(i);
      if (y < 0) {
        y = 0;
      }
      data.push({ x: i, y: y });
    }
    // console.log(data)
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Container>
        <View style={{ height: Constants.statusBarHeight }} />
        <Header>
          <Left>
            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>

        <Content contentContainerStyle={[StyleSheet.absoluteFill, styles.svgView]}>
          {/* <Svg height="100%" width="100%" viewBox="0 0 100 100" >
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="blue"
                strokeWidth="2.5"
                fill="green" />
            <Rect
              x="15"
              y="15"
              width="70"
              height="70"
              stroke="red"
              strokeWidth="2"
              fill="yellow" />
            </Svg> */}
          <VictoryChart
            theme={VictoryTheme.material}
            style={{ parent: { height: '100%' } }}
            height={styles.svgView.height}
            containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 100], y: [0, 100] }} />}
          >
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              height={5000}
              samples={1000}
              size={5}
              domain={{ x: [0, 200], y: [0, 100] }}
              y={data => (this.wurfParabel(data.x) >= 0 ? this.wurfParabel(data.x) : 0)}
            />
            {/* <VictoryLine
                  samples={50}
                  style={{data:
                    {stroke: "red", strokeWidth: 4}
                  }}
                  y={(data) => Math.sin(2 * Math.PI * data.x)}
                /> */}
          </VictoryChart>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  input: state.input
});
export default connect(mapStateToProps, {})(MainScreen);
