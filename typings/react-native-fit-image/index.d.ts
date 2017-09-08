declare module 'react-native-fit-image' {
  import { Component } from 'react';
  import { ImageProperties } from 'react-native';

  type IFitImageProps = ImageProperties;

  class FitImage extends Component<IFitImageProps, {}> {
  }

  export default FitImage;
}
