import React, { useState } from 'react';
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
  Footer,
  ListItem,
  CheckBox
} from 'native-base';
import Constants from 'expo-constants';
import {
  updateVelocity,
  updateAngle,
  updateHeight,
  updateGravity,
  resetInput,
  updateInitialMass,
  updateFinalMass,
  updateExhaustVelocity,
  updateMassFlowRate
  // updateDeltaV,
  // updateSpecificImpulse,
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
      action = text => dispatch(updateVelocity(parseFloat(text)));
      display = input.projectile.velocity.toString(10);
      break;
    case 'angle':
      action = text => dispatch(updateAngle(parseFloat(text)));
      display = input.projectile.angle.toString(10);
      break;
    case 'height':
      action = text => dispatch(updateHeight(parseFloat(text)));
      display = input.projectile.height.toString(10);
      break;
    case 'gravity':
      action = text => dispatch(updateGravity(parseFloat(text)));
      display = input.projectile.gravity.toString(10);
      break;
    case 'initialMass':
      action = text => dispatch(updateInitialMass(parseFloat(text)));
      display = input.rocket.initialMass.toString(10);
      break;
    case 'finalMass':
      action = text => dispatch(updateFinalMass(parseFloat(text)));
      display = input.rocket.finalMass.toString(10);
      break;
    case 'exhaustVelocity':
      action = text => dispatch(updateExhaustVelocity(parseFloat(text)));
      display = input.rocket.exhaustVelocity.toString(10);
      break;
    case 'massFlowRate':
      action = text => dispatch(updateMassFlowRate(parseFloat(text)));
      display = input.rocket.massFlowRate.toString(10);
      break;
    // case 'deltaV':
    //   action = text => dispatch(updateDeltaV(parseFloat(text)));
    //   display = input.deltaV.toString(10);
    //   break;
    // case 'specificImpulse':
    //   action = text => dispatch(updateSpecificImpulse(parseFloat(text)));
    //   display = input.specificImpulse.toString(10);
    //   break;
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
    projectile: PropTypes.shape({
      velocity: PropTypes.number,
      angle: PropTypes.number,
      height: PropTypes.number,
      gravity: PropTypes.number
    }),
    rocket: PropTypes.shape({
      initialMass: PropTypes.number,
      finalMass: PropTypes.number,
      exhaustVelocity: PropTypes.number,
      massFlowRate: PropTypes.number
      // deltaV: PropTypes.number,
      // specificImpulse: PropTypes.number
    })
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
  const [checked, useChecked] = useState(false);
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
          <InputField name="gravity" unit=" m/s²" label="Standard Gravity" input={input} />
          <ListItem>
            <CheckBox checked={checked} onPress={() => useChecked(!checked)} />
            <Body>
              <Text>Advanced options for Rockets</Text>
            </Body>
          </ListItem>
          {checked && (
            <View>
              <InputField name="initialMass" unit=" kg" label="Initial Total Mass" input={input} />
              <InputField name="finalMass" unit=" kg" label="Final Total Mass" input={input} />
              <InputField
                name="exhaustVelocity"
                unit=" m/s"
                label="Exhaust Velocity"
                input={input}
              />
              <InputField name="massFlowRate" unit=" kg/s" label="Mass Flow Rate" input={input} />
              {/* <InputField name="deltaV" unit="" label="delta-V" input={input} />
              <InputField name="specificImpulse" unit=" s" label="Specific Impulse" input={input} /> */}
            </View>
          )}
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
