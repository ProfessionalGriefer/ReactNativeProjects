/* eslint-disable no-eval */
import React from 'react';
import { View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';

import {
  changeField,
  changeHighlighted,
  solve,
  resetGrid
} from './redux/actions';
import styles from './styles';

const Field = ({ row, column }) => {
  const dispatch = useDispatch();
  const { grid } = useSelector(state => ({ ...state }));
  const { highlighted } = useSelector(state => ({ ...state }));
  let isHighlighted = false;
  if (highlighted.row === row && highlighted.column === column) {
    isHighlighted = true;
  }

  const handlePress = () => {
    dispatch(changeField({ number: '', row, column }));
    dispatch(changeHighlighted({ row, column }));
  };
  const handleSubmit = input => {
    dispatch(
      changeField({ number: input.replace(/[^1-9]/g, ''), row, column })
    );
  };
  // column % 3 === 0 ? styles.columnDivider : styles.nothing
  return (
    <TextInput
      caretHidden
      maxLength={1}
      onTouchStart={handlePress}
      keyboardType="number-pad"
      style={[
        isHighlighted
          ? { fontWeight: 'bold', backgroundColor: '#66ff99' }
          : styles.nothing,
        row % 3 === 0 ? styles.rowDivider : styles.nothing,
        column % 3 === 0 ? styles.columnDivider : styles.nothing,
        styles.text
      ]}
      value={grid[row][column].toString()}
      clearTextOnFocus
      onChangeText={text => handleSubmit(text)}
    />
  );
};

Field.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired
};
const Grid = () => {
  const data = [];
  let row = [];
  let key = 0;

  // row
  for (let i = 0; i < 9; i += 1) {
    // column
    row = [];
    for (let k = 0; k < 9; k += 1) {
      row.push(<Field key={key} row={i} column={k} />);
      key += 1;
    }
    data.push(
      <View key={key} style={styles.row}>
        {row}
      </View>
    );
    key += 1;
  }

  return <View style={styles.grid}>{data}</View>;
};
const Display = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={{ height: Constants.statusBarHeight }} />

      <Grid style={styles.gridContainer} />
      <View style={styles.keyboardContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              color="red"
              title="Reset"
              onPress={() => dispatch(resetGrid())}
            />
          </View>
          <View style={styles.button}>
            <Button
              color="green"
              title="Solve"
              onPress={() => dispatch(solve())}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Display;
