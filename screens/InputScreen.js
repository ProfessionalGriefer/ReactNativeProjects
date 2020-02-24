import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title,
  Form,
  Input,
  Item,
  Label,
  Button,
  Text,
  Footer
} from 'native-base';
import Constants from 'expo-constants';
import {
  updateVelocity,
  updateAngle,
  updateHeight,
  updateGravitation,
  resetInput
} from '../redux/actions';

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45
  }
});

class InputScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => <Icon name="input" style={{ color: tintColor }} />
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <View style={{ height: Constants.statusBarHeight }} />
        <Header>
          <Left>
            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Title>Input</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Initial Velocity</Label>
              <Input
                keyboardType="numeric"
                onSubmitEditing={e => this.props.updateVelocity(parseFloat(e.nativeEvent.text))}
                placeholder={this.props.input.velocity.toString(10) + ' m/s'}
              />
            </Item>
            <Item stackedLabel>
              <Label>Angle</Label>
              <Input
                keyboardType="numeric"
                onSubmitEditing={e => this.props.updateAngle(parseFloat(e.nativeEvent.text))}
                placeholder={this.props.input.angle.toString(10) + '°'}
              />
            </Item>
            <Item stackedLabel>
              <Label>Height</Label>
              <Input
                keyboardType="numeric"
                onSubmitEditing={e => this.props.updateHeight(parseFloat(e.nativeEvent.text))}
                placeholder={this.props.input.height.toString(10) + ' m'}
              />
            </Item>
            <Item stackedLabel>
              <Label>Gravitation</Label>
              <Input
                keyboardType="numeric"
                onSubmitEditing={e => this.props.updateGravitation(parseFloat(e.nativeEvent.text))}
                placeholder={this.props.input.gravitation.toString(10) + ' m/s²'}
              />
            </Item>
          </Form>
        </Content>
        <Footer style={styles.buttonContainer}>
          <Button block danger style={{ flex: 1 }} onPress={this.props.resetInput}>
            <Text>Reset</Text>
          </Button>
          <Button
            block
            success
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text>Done</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  input: state.input
});

export default connect(mapStateToProps, {
  updateVelocity,
  updateAngle,
  updateHeight,
  updateGravitation,
  resetInput
})(InputScreen);
