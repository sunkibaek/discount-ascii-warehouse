import React, { Component } from 'react';

import NDJSONHelper from '../libs/NDJSONHelper';
import Network from '../libs/Network';
import { IProduct } from './Product';
import Products from './Products';

interface IProductsContainerProps {
  loadMore: boolean;
}
interface IProductsContainerState {
  isLoading: boolean;
  isLoadingEnded: boolean;
  isLoadingMore: boolean;
  products: IProduct[];
  sort: string;
}

/**
 * Fetches data from API and pass data to products component along with different loading states
 * It also tries to pre-fetches data 5 seconds after successful fetching data
 */
class ProductsContainer extends Component<IProductsContainerProps, IProductsContainerState> {
  public static PREFETCH_AFTER = 5000;
  public baseURL: string;
  public prefetchedData: {[k in string]: IProduct[]} = {};
  public prefetchTimer: number;

  constructor(props: IProductsContainerProps) {
    super(props);

    this.state = {
      isLoading: false,
      isLoadingEnded: false,
      isLoadingMore: false,
      products: [],
      sort: '',
    };
  }

  public componentDidMount() {
    const { sort } = this.state;

    this.loadProducts(sort);
  }

  public componentDidUpdate() {
    const { loadMore } = this.props;

    if (loadMore) {
      this.loadMore();
    }
  }

  public render() {
    const { isLoading, isLoadingEnded, isLoadingMore, products, sort } = this.state;

    return (
      <Products
        isLoading={isLoading}
        isLoadingEnded={isLoadingEnded}
        isLoadingMore={isLoadingMore}
        onSortPress={this.sortBy}
        products={products}
        selectedSort={sort}
      />
    );
  }

  private loadMore = () => {
    const { isLoading, isLoadingMore, products, sort } = this.state;

    if (isLoading || isLoadingMore) {
      return;
    }

    this.setState({ isLoadingMore: true });

    this.loadProducts(sort, true, products.length)
      .then(() => {
        this.setState({ isLoadingMore: false });
      });
  }

  private sortBy = (sort: string) => {
    return () => {
      let newSort = sort;

      this.setState((prevState) => {
        if (sort === prevState.sort) {
          newSort = '';
        }

        return ({ sort: newSort });
      }, () => {
        this.loadProducts(newSort);
      });
    };
  }

  private loadProducts = async (sort: string, isAppending?: boolean, skip?: number) => {
    this.baseURL = `${Network.URLS.products}?sort=${sort}`;
    const url = `${this.baseURL}&skip=${skip}`;
    const prefetchedDataForURL = this.prefetchedData[url];

    clearTimeout(this.prefetchTimer);

    this.setState({ isLoading: true });

    if (!isAppending) {
      this.setState({ products: [] });
    }

    if (prefetchedDataForURL) {
      const isLoadingEnded = prefetchedDataForURL.length === 0;

      this.setProducts(prefetchedDataForURL, isLoadingEnded);

      delete this.prefetchedData[url];

      return Promise.resolve();
    }

    return fetch(url)
      .then((response) => {
        response
          .text()
          .then((text) => {
            const products = NDJSONHelper.parse(text) as IProduct[];
            const isLoadingEnded = products.length === 0;

            this.setProducts(products, isLoadingEnded);
          });
      });
  }

  private setProducts = (products: IProduct[], isLoadingEnded: boolean) => {
    this.setState((prevState) => {
      const newProducts = prevState.products.concat(products);
      const newSkip = newProducts.length;
      const prefetchURL = `${this.baseURL}&skip=${newSkip}`;

      this.prefetchTimer = setTimeout(() => {
        this.prefetch(prefetchURL);
      }, ProductsContainer.PREFETCH_AFTER);

      return {
        isLoading: false,
        isLoadingEnded,
        products: newProducts,
      };
    });
  }

  private prefetch = (url: string) => {
    fetch(url)
      .then((response) => {
        response
          .text()
          .then((text) => {
            const products = NDJSONHelper.parse(text) as IProduct[];

            this.prefetchedData[url] = products;
          });
      });
  }
}

export default ProductsContainer;
