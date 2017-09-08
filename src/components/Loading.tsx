import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Color from '../styles/Color';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  text: {
    color: Color.WHITE,
    marginTop: 8,
  },
});

/**
 * Renders loading indicator
 */
const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator color={Color.WHITE} size="large" />
    <Text style={styles.text}>Loading ...</Text>
  </View>
);

export default Loading;
