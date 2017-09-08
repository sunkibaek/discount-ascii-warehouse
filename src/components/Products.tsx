import { chunk } from 'lodash';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Color from '../styles/Color';
import AD from './AD';
import Loading from './Loading';
import Product, { IProduct } from './Product';
import ProductsSortControls from './ProductsSortControls';

interface IProductsProps {
  isLoading: boolean;
  isLoadingEnded: boolean;
  isLoadingMore: boolean;
  onSortPress: (sort: string) => () => void;
  products: IProduct[];
  selectedSort: string;
}

const styles = StyleSheet.create({
  adContainer: {
    marginBottom: 8,
  },
  container: {
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: {
    color: Color.WHITE,
  },
  textContainer: {
    alignItems: 'center',
    padding: 8,
  },
});

/**
 * Renders list of products with different loading states
 */
class Products extends Component<IProductsProps, {}> {
  public static ITEMS_PER_ROW = 2;
  public static AD_AT_EVERY = 10; // since one row has two items, it will show add after every 20 products

  public render() {
    const { isLoadingEnded, isLoadingMore, onSortPress, selectedSort } = this.props;

    return (
      <View style={styles.container}>
        <ProductsSortControls selectedSort={selectedSort} onSortPress={onSortPress} />

        {this.renderProducts()}
        {isLoadingMore && <Loading />}
        {isLoadingEnded && this.renderLoadingEnded()}
      </View>
    );
  }

  private renderProducts = () => {
    const { isLoading, products } = this.props;
    const groupedProducts = chunk(products, Products.ITEMS_PER_ROW);

    if (isLoading && products.length === 0) {
      return <Loading />;
    }

    return groupedProducts.map((group, index) => {
      if (index !== 0 && index % Products.AD_AT_EVERY === 0) {
        return <AD key={index} style={styles.adContainer} />;
      }

      return this.renderProductsRow(group, index);
    });
  }

  private renderProductsRow = (products: IProduct[], index: number) => (
    <View key={index} style={styles.rowContainer}>
      {products.map((p) => <Product key={p.id} product={p} />)}
    </View>
  )

  private renderLoadingEnded = () => (
    <View style={styles.textContainer}>
      <Text style={styles.text}>~ End of Catalogue ~</Text>
    </View>
  )
}

export default Products;
