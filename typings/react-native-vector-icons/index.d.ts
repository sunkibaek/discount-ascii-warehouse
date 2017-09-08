declare module 'react-native-vector-icons/*' {
  import { Component } from 'react';
  import { TextStyle } from 'react-native';

  interface IconProps {
    name: string
    size?: number
    color?: string
    style?: TextStyle,
  }

  class Icon extends Component<IconProps, {}> {}

  export default Icon;
}
