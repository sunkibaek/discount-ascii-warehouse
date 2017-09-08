import React, { Component } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import AD from './components/AD';
import NavigationBar from './components/NavigationBar';
import ProductsContainer from './components/ProductsContainer';
import Color from './styles/Color';

interface IAppState {
  isAtBottom: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BLUESTONE,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 16,
  },
});

class App extends Component<{}, IAppState> {
  public static BOTTOM_OFFSET = 320;
  public contentHeight = 0;
  public lastContentOffsetY = 0;

  constructor(props: {}) {
    super(props);

    this.state = { isAtBottom: false };
  }

  public render() {
    const { isAtBottom } = this.state;

    return (
      <View style={styles.container}>
        <NavigationBar />

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          onContentSizeChange={this.handleContentSizeChange}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
        >
          <AD />
          <ProductsContainer loadMore={isAtBottom} />
        </ScrollView>
      </View>
    );
  }

  private handleContentSizeChange = (_contentWidth: number, contentHeight: number) => {
    this.contentHeight = contentHeight;
  }

  private handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    const isAtBottom = this.isAtBottom(contentOffsetY, layoutHeight);
    const isScrollingDown = this.lastContentOffsetY < contentOffsetY;

    this.setState({ isAtBottom: isAtBottom && isScrollingDown });
    this.lastContentOffsetY = contentOffsetY;
  }

  private isAtBottom = (contentOffsetY: number, layoutHeight: number) => {
    const bottomScrollY = contentOffsetY + layoutHeight + App.BOTTOM_OFFSET;

    return bottomScrollY > this.contentHeight;
  }
}

export default App;
