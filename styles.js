import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  gridContainer: {
    height: width,
    width
  },
  grid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  rowDivider: {
    borderTopWidth: 3,
    borderTopColor: 'black'
  },
  columnDivider: {
    borderLeftWidth: 3,
    borderLeftColor: 'black'
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    borderWidth: 1
  },
  keyboardContainer: {
    height: height - width,
    width
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    flex: 1
  },
  nothing: {}
});

export default styles;
