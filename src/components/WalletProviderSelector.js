import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateWeb3, setIsLoading } from "../reducers/application";
import { NETWORK_TYPES } from "../config";
import { OrangeButton, OrangeOutlineButton } from "./UI/Button";

const { INJECTED, LEDGER_MAIN, LEDGER_ROPSTEN } = NETWORK_TYPES;

class WalletProviderSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNetwork: ""
    };

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
    this.setNetwork = this.setNetwork.bind(this);
    this.selectBack = this.selectBack.bind(this);
    this.selectMain = this.selectMain.bind(this);
  }

  handleNetworkChange(networkType) {
    this.props.updateWeb3({
      network: networkType
    });
    Router.push("/deploy");
  }

  selectMain() {
    this.setState({
      selectedNetwork: "Main"
    });
  }

  async setNetwork(network) {
    this.props.setIsLoading();
    await this.handleNetworkChange(network);
  }

  selectBack() {
    this.setState({
      selectedNetwork: ""
    });
  }

  render() {
    const { id } = this.props;
    const { selectedNetwork } = this.state;
    return (
      <div id={id}>
        <div>
          {selectedNetwork === "Main" && (
            <div>
              <OrangeButton
                id="ledger-test"
                variant="pill"
                onClick={() => this.setNetwork(LEDGER_ROPSTEN)}
              >
                Test
              </OrangeButton>
              <OrangeButton
                id="ledger-production"
                variant="pill"
                onClick={() => this.setNetwork(LEDGER_MAIN)}
              >
                Production
              </OrangeButton>
            </div>
          )}

          {selectedNetwork === "" ? (
            <div>
              <OrangeButton
                id="metamask"
                variant="pill"
                onClick={() => this.setNetwork(INJECTED)}
              >
                Metamask
              </OrangeButton>
              <OrangeButton
                id="ledger"
                variant="pill"
                onClick={this.selectMain}
              >
                Ledger
              </OrangeButton>
            </div>
          ) : (
            <OrangeOutlineButton
              id="back"
              variant="pill"
              onClick={this.selectBack}
            >
              <i
                className="fa fa-chevron-left"
                style={{ float: "left" }}
                aria-hidden="true"
              />{" "}
              Back
            </OrangeOutlineButton>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateWeb3: payload => dispatch(updateWeb3(payload)),
  setIsLoading: () => dispatch(setIsLoading())
});

export default connect(
  null,
  mapDispatchToProps
)(WalletProviderSelector);

WalletProviderSelector.propTypes = {
  id: PropTypes.string,
  updateWeb3: PropTypes.func,
  isLoading: PropTypes.bool,
  rest: PropTypes.object,
  setIsLoading: PropTypes.func
};
