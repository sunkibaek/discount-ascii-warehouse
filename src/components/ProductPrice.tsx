import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ViewHelper from '../libs/ViewHelper';
import Color from '../styles/Color';

interface IProductPriceProps {
  price: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.OLIVE,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  text: {
    color: Color.WHITE,
    fontSize: 10,
  },
});

/**
 * Renders price of product in label-like design
 */
const ProductPrice = ({ price }: IProductPriceProps) => {
  const dollarPrice = ViewHelper.dollarFormat(price);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {dollarPrice}
      </Text>
    </View>
  );
};

export default ProductPrice;
