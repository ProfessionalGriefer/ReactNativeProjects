import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Dimensions, platform } from 'react-native';
import { Container, Content, Left, Right, Header, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
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
const toRadians = angle => {
  return angle * (Math.PI / 180);
};
const Chart = props => (
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
      domain={props.domain}
      y={data => (props.func(data.x) >= 0 ? props.func(data.x) : 0)}
    />
  </VictoryChart>
);

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
  // für Taschenrechner: -0.5 * (g / (v*v * cos(alpha)*cos(alpha) ) ) * x*x + tan(alpha) * x + h;
  wurfParabel = (
    x,
    v = this.props.input.velocity,
    alpha = this.props.input.angle,
    h = this.props.input.height,
    g = this.props.input.gravitation
  ) => {
    return (
      -0.5 * (g / (v * v * Math.pow(Math.cos(toRadians(alpha)), 2))) * x * x +
      Math.tan(toRadians(alpha)) * x +
      h
    );
  };

  render() {
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
          <Chart func={this.wurfParabel} domain={{ x: [0, 200], y: [0, 100] }} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  input: state.input
});
export default connect(mapStateToProps, {})(MainScreen);
