import React, { Component } from "react";
import PropTypes from "prop-types";
import images from "../Images";
import styles from "./style.scss";
import Button from "../UI/Button";
import Panel from "../UI/Panel";
import WalletProviderSelector from "../WalletProviderSelector";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
    this.toggleWalletProviderSelector = this.toggleWalletProviderSelector.bind(
      this
    );

    this.state = {
      showWalletProviderSelector: false
    };
  }

  // eslint-disable-next-line class-methods-use-this
  refreshPage() {
    window.location.reload();
  }

  toggleWalletProviderSelector() {
    this.setState({
      showWalletProviderSelector: !this.state.showWalletProviderSelector
    });
  }

  render() {
    const { showWalletProviderSelector } = this.state;
    return (
      <Panel style={{ textAlign: "center" }}>
        <div className={styles.walletError}>
          {images.wallet()}
          <h1>Admin wallet address not found.</h1>
          {!showWalletProviderSelector ? (
            <div>
              <p>
                Please click{" "}
                <a href="https://docs.opencerts.io/appendix_test_accounts.html">
                  here
                </a>{" "}
                and follow the instructions to install a test wallet.
              </p>
              <Button onClick={this.toggleWalletProviderSelector} danger>
                Change Wallet Provider
              </Button>
              <Button onClick={this.refreshPage} dangerOutline>
                Retry
              </Button>
            </div>
          ) : (
            <div>
              <p>Select another wallet provider.</p>
              <WalletProviderSelector />
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

export default ErrorPage;

ErrorPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  rest: PropTypes.object
};
