import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const InputField = props => (
  <Item stackedLabel>
    <Label>{props.label}</Label>
    <Input
      keyboardType="numeric"
      onSubmitEditing={e =>
        eval('props.state.update' + props.name.capitalize() + '(parseFloat(e.nativeEvent.text))')
      }
      placeholder={eval('props.state.input.' + props.name + '.toString(10)') + props.unit}
    />
  </Item>
);

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
            <InputField
              name={'velocity'}
              unit={' m/s'}
              label={'Initial Velocity'}
              state={this.props}
            />
            <InputField name={'angle'} unit={'°'} label={'Angle'} state={this.props} />
            <InputField name={'height'} unit={' m'} label={'Height'} state={this.props} />
            <InputField
              name={'gravitation'}
              unit={' m/s²'}
              label={'Gravitation'}
              state={this.props}
            />
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
