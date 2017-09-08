import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';

import Color from '../styles/Color';

interface IButtonProps {
  isActive?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  text: string;
}

const styles = StyleSheet.create({
  activeContainer: {
    backgroundColor: Color.OLIVE,
    borderColor: Color.WHITE,
  },
  activeText: {
    color: Color.WHITE,
  },
  container: {
    borderColor: Color.OLIVE,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  text: {
    color: Color.OLIVE,
    fontSize: 12,
  },
});

/**
 * Renders a button -- to be used in sort buttons
 */
class Button extends Component<IButtonProps, {}> {
  public render() {
    const { isActive, onPress, style, text } = this.props;
    const containerStyle = [styles.container, style, isActive && styles.activeContainer];
    const textStyle = [styles.text, isActive && styles.activeText];

    return (
      <TouchableHighlight onPress={onPress} style={containerStyle} underlayColor={Color.OLIVE}>
        <Text style={textStyle}>{text}</Text>
      </TouchableHighlight>
    );
  }
}

export default Button;
