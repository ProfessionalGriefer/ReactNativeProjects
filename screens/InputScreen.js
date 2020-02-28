import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
const InputField = ({ name, input, label, unit }) => {
  const dispatch = useDispatch();
  let action;
  let display;
  switch (name) {
    case 'velocity':
      action = text => dispatch(updateVelocity(text));
      display = input.velocity.toString(10);
      break;
    case 'angle':
      action = text => dispatch(updateAngle(text));
      display = input.angle.toString(10);
      break;
    case 'height':
      action = text => dispatch(updateHeight(text));
      display = input.height.toString(10);
      break;
    case 'gravitation':
      action = text => dispatch(updateGravitation(text));
      display = input.gravitation.toString(10);
      break;
    default:
  }
  return (
    <Item stackedLabel>
      <Label>{label}</Label>
      <Input
        keyboardType="numeric"
        onSubmitEditing={e => action(e.nativeEvent.text)}
        placeholder={display + unit}
      />
    </Item>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.shape({
    velocity: PropTypes.number,
    angle: PropTypes.number,
    height: PropTypes.number,
    gravitation: PropTypes.number
  }).isRequired,
  label: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired
};

const drawerIcon = ({ tintColor }) => <Icon name="home" style={{ color: tintColor }} />;
drawerIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const InputScreen = props => {
  InputScreen.navigationOptions = {
    drawerIcon
  };
  const { input } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();
  return (
    <Container>
      <View style={{ height: Constants.statusBarHeight }} />
      <Header>
        <Left>
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body>
          <Title>Input</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <InputField name="velocity" unit=" m/s" label="Initial Velocity" input={input} />
          <InputField name="angle" unit="°" label="Angle" input={input} />
          <InputField name="height" unit=" m" label="Height" input={input} />
          <InputField name="gravitation" unit=" m/s²" label="Gravitation" input={input} />
        </Form>
      </Content>
      <Footer style={styles.buttonContainer}>
        <Button block danger style={{ flex: 1 }} onPress={() => dispatch(resetInput())}>
          <Text>Reset</Text>
        </Button>
        <Button block success style={{ flex: 1 }} onPress={() => props.navigation.navigate('Home')}>
          <Text>Done</Text>
        </Button>
      </Footer>
    </Container>
  );
};

InputScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired
  }).isRequired
};

export default InputScreen;
