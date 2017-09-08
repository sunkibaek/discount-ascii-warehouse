import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Color from '../styles/Color';
import ProductDate from './ProductDate';
import ProductPrice from './ProductPrice';

interface IProduct {
  date: string;
  face: string;
  id: string;
  price: number;
  size: number;
}

interface IProductProps {
  product: IProduct;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.WHITE,
    height: 160,
    justifyContent: 'center',
  },
  date: {
    bottom: 0,
    left: 0,
    paddingBottom: 4,
    paddingLeft: 4,
    position: 'absolute',
  },
  face: {
    color: Color.BLACK,
  },
  price: {
    bottom: 0,
    paddingBottom: 4,
    paddingRight: 4,
    position: 'absolute',
    right: 0,
  },
});

/**
 * Renders an individual product card with face, date, price
 */
class Product extends Component<IProductProps, {}> {
  public render() {
    const { product } = this.props;
    const width = (Dimensions.get('window').width - 32) / 2 - 4;

    return (
      <View style={[styles.container, { width }]}>
        <Text style={[styles.face, this.getFaceStyle(product.size)]}>
          {product.face}
        </Text>

        <View style={styles.date}>
          <ProductDate date={product.date} />
        </View>

        <View style={styles.price}>
          <ProductPrice price={product.price} />
        </View>
      </View>
    );
  }

  private getFaceStyle = (size: number) => {
    return {
      fontSize: size,
    };
  }
}

export default Product;
export { IProduct };
