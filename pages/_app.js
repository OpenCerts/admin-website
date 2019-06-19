import React from "react";
import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import Router from "next/router";
import { Provider } from "react-redux";
import initStore from "../src/store";
import Meta from "../src/components/Meta";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <React.Fragment>
        <Meta />
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRedux(initStore, Router)(MyApp);
