import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from './Button';

interface IProductsSortControls {
  onSortPress: (sort: string) => () => void;
  selectedSort: string;
}

const styles = StyleSheet.create({
  button: {
    marginRight: 4,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  title: {
    fontSize: 10,
    marginRight: 4,
  },
});

/**
 * Renders products sort buttons
 */
class ProductsSortControls extends Component<IProductsSortControls, {}> {
  public static SORT_BYS = ['ID', 'Size', 'Price'];

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SORT BY</Text>

        {this.renderButtons()}
      </View>
    );
  }

  private renderButtons = () => {
    const { onSortPress, selectedSort } = this.props;

    return ProductsSortControls.SORT_BYS.map((sort) => (
      <Button
        isActive={selectedSort === sort.toLowerCase()}
        key={sort}
        onPress={onSortPress(sort.toLowerCase())}
        style={styles.button}
        text={sort}
      />
    ));
  }
}

export default ProductsSortControls;
