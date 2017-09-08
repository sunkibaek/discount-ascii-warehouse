import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Color from '../styles/Color';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: Color.BLACK,
    height: 64,
    justifyContent: 'center',
    paddingTop: 20,
  },
  text: {
    color: Color.WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
});

/**
 * Renders navigation bar with site title
 */
const NavigationBar = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />

    <Text style={styles.text}>
      Discount Ascii Warehouse
    </Text>
  </View>
);

export default NavigationBar;
