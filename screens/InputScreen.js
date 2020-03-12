import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
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
  updateInitialMass,
  updateFinalMass,
  updateExhaustVelocity,
  updateMassFlowRate,
  resetInput,
  toggleCheck
  // updateDeltaV,
  // updateSpecificImpulse,
} from '../redux/actions';

const styles = StyleSheet.create({
  size: 30,
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45
  }
});
const InputField = ({ name, inputProjectile, inputRocket, label, unit }) => {
  const dispatch = useDispatch();
  let action;
  let display;
  switch (name) {
    case 'velocity':
      action = text => dispatch(updateVelocity(parseFloat(text)));
      display = inputProjectile.velocity.toString(10);
      break;
    case 'angle':
      action = text => dispatch(updateAngle(parseFloat(text)));
      display = inputProjectile.angle.toString(10);
      break;
    case 'height':
      action = text => dispatch(updateHeight(parseFloat(text)));
      display = inputProjectile.height.toString(10);
      break;
    case 'gravity':
      action = text => dispatch(updateGravity(parseFloat(text)));
      display = inputProjectile.gravity.toString(10);
      break;
    case 'initialMass':
      action = text => dispatch(updateInitialMass(parseFloat(text)));
      display = inputRocket.initialMass.toString(10);
      break;
    case 'finalMass':
      action = text => dispatch(updateFinalMass(parseFloat(text)));
      display = inputRocket.finalMass.toString(10);
      break;
    case 'exhaustVelocity':
      action = text => dispatch(updateExhaustVelocity(parseFloat(text)));
      display = inputRocket.exhaustVelocity.toString(10);
      break;
    case 'massFlowRate':
      action = text => dispatch(updateMassFlowRate(parseFloat(text)));
      display = inputRocket.massFlowRate.toString(10);
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
  inputProjectile: PropTypes.shape({
    velocity: PropTypes.number,
    angle: PropTypes.number,
    height: PropTypes.number,
    gravity: PropTypes.number
  }).isRequired,
  inputRocket: PropTypes.shape({
    initialMass: PropTypes.number,
    finalMass: PropTypes.number,
    exhaustVelocity: PropTypes.number,
    massFlowRate: PropTypes.number
    // deltaV: PropTypes.number,
    // specificImpulse: PropTypes.number
  }).isRequired,
  label: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired
};

const drawerIcon = ({ tintColor }) => <Icon size={30} name="md-calculator" color={tintColor} />;
drawerIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const InputScreen = props => {
  InputScreen.navigationOptions = {
    drawerIcon
  };
  const { inputProjectile, inputRocket } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();
  // const toggle = () => dispatch(toggleCheck());
  return (
    <Container>
      <View style={{ height: Constants.statusBarHeight }} />
      <Header>
        <Left>
          <Icon size={styles.size} name="md-menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body>
          <Title>Input</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          {!inputRocket.checked && (
            <InputField
              name="velocity"
              unit=" m/s"
              label="Initial Velocity"
              inputRocket={inputRocket}
              inputProjectile={inputProjectile}
            />
          )}
          <InputField
            name="angle"
            unit="°"
            label="Angle"
            inputRocket={inputRocket}
            inputProjectile={inputProjectile}
          />
          <InputField
            name="height"
            unit=" m"
            label="Height"
            inputRocket={inputRocket}
            inputProjectile={inputProjectile}
          />
          <InputField
            name="gravity"
            unit=" m/s²"
            label="Standard Gravity"
            inputRocket={inputRocket}
            inputProjectile={inputProjectile}
          />
          <ListItem>
            <CheckBox checked={inputRocket.checked} onPress={() => dispatch(toggleCheck())} />
            <Body>
              <Text>Advanced options for Rockets</Text>
            </Body>
          </ListItem>

          {inputRocket.checked && (
            <View>
              <InputField
                name="initialMass"
                unit=" kg"
                label="Initial Total Mass"
                inputRocket={inputRocket}
                inputProjectile={inputProjectile}
              />
              <InputField
                name="finalMass"
                unit=" kg"
                label="Final Total Mass"
                inputRocket={inputRocket}
                inputProjectile={inputProjectile}
              />
              <InputField
                name="exhaustVelocity"
                unit=" m/s"
                label="Exhaust Velocity"
                inputRocket={inputRocket}
                inputProjectile={inputProjectile}
              />
              <InputField
                name="massFlowRate"
                unit=" kg/s"
                label="Mass Flow Rate"
                inputRocket={inputRocket}
                inputProjectile={inputProjectile}
              />
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
