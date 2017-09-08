import moment from 'moment';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Color from '../styles/Color';

interface IProductDateProps {
  date: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    color: Color.BLACK,
    fontSize: 12,
  },
});

/**
 * Renders product date
 * absolutely -- when date is older than 7 days,
 * and relative otherwise
 */
class ProductDate extends Component<IProductDateProps, {}> {
  public static DATETIME_FORMAT = 'ddd MMM DD YYYY HH:mm:ss GMTZZ';
  public static ABSOLUTE_DATE_CUTOFF = 7;

  public render() {
    const { date } = this.props;
    const momentDate = moment(date, ProductDate.DATETIME_FORMAT);
    const displayDate = momentDate.isAfter(moment().subtract(ProductDate.ABSOLUTE_DATE_CUTOFF, 'days'))
      ? momentDate.fromNow()
      : momentDate.format('L');

    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon color={Color.BLACK} name="calendar" size={12} />
        </View>

        <Text style={styles.text}>
          {displayDate}
        </Text>
      </View>
    );
  }
}

export default ProductDate;
