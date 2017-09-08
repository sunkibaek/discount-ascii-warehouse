import { padEnd } from 'lodash';

/**
 * Holds formatting helper methods
 */
class ViewHelper {
  /**
   * Returns given dollar in cents in $4.10 like format
   * Will pad with zero up to two digits under decimal point
   */
  public static dollarFormat = (dollarInCents: number): string => {
    const dollarPrice = String(dollarInCents / 100);
    const [integer, decimal] = dollarPrice.split('.');

    return `$${integer}.${padEnd(decimal, 2, '0')}`;
  }
}

export default ViewHelper;
