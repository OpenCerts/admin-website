import React, { Component } from "react";
import PropTypes from "prop-types";
import images from "../Images";
import styles from "./style.scss";
import Button from "../Button";
import Panel from "../Panel";
import NetworkSelector from "../NetworkSelector";

class ErrorContainer extends Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
    this.toggleNetworkSelector = this.toggleNetworkSelector.bind(this);

    this.state = {
      showNetworkSelector: false
    };
  }

  // eslint-disable-next-line class-methods-use-this
  refreshPage() {
    window.location.reload();
  }

  toggleNetworkSelector() {
    this.setState({
      showNetworkSelector: !this.state.showNetworkSelector
    });
  }

  render() {
    const { showNetworkSelector } = this.state;
    return (
      <Panel style={{ textAlign: "center" }}>
        <div className={styles.walletError}>
          {images.wallet()}
          <h1>Admin wallet address not found.</h1>
          {!showNetworkSelector ? (
            <div>
              <p>
                Please click{" "}
                <a href="https://docs.opencerts.io/appendix_test_accounts.html">
                  here
                </a>{" "}
                and follow the instructions to install a test wallet.
              </p>
              <Button onClick={this.toggleNetworkSelector} danger>
                Change Network
              </Button>
              <Button onClick={this.refreshPage} dangerOutline>
                Continue
              </Button>
            </div>
          ) : (
            <div>
              <p>Select another wallet network.</p>
              <NetworkSelector />
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

export default ErrorContainer;

ErrorContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  rest: PropTypes.object
};
