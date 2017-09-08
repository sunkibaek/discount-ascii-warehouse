import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FitImage from 'react-native-fit-image';

import Network from '../libs/Network';
import Color from '../styles/Color';

interface IADProps {
  style?: ViewStyle;
}
interface IADState {
  uri: string;
}

const styles = StyleSheet.create({
  caption: {
    backgroundColor: Color.WHITE,
    color: Color.BLACK,
    fontSize: 12,
    padding: 2,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    alignSelf: 'stretch',
  },
  imageContainer: {
    borderColor: Color.WHITE,
    borderWidth: 1,
  },
});

/**
 * Renders random cat advertisement
 */
class AD extends Component<IADProps, IADState> {
  public static lastID: string;

  constructor(props: IADProps) {
    super(props);

    this.state = { uri: '' };
  }

  public componentDidMount() {
    this.setState({ uri: this.getURL() });
  }

  public render() {
    const { uri } = this.state;
    const { style } = this.props;

    if (!uri) {
      return null;
    }

    return (
      <View style={[styles.container, style]}>
        <View style={styles.imageContainer}>
          <FitImage source={{ uri }} />

          <Text style={styles.caption}>AD</Text>
        </View>
      </View>
    );
  }

  private getURL = (): string => (
    `${Network.URLS.ad}?r=${this.getID()}`
  )

  /**
   * Returns a random ID while making sure it does not return the same ID in a row
   */
  private getID = (): string => {
    let id;

    do {
      id = String(Math.floor(Math.random() * 1000));
    } while (id === AD.lastID);

    AD.lastID = id;
    return id;
  }
}

export default AD;
