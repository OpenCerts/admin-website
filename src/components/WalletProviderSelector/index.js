import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateWeb3, setIsLoading } from "../../reducers/application";
import { NETWORK_TYPES } from "../../config";
import Button from "../UI/Button";

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
              <Button
                id="ledger-test"
                onClick={() => this.setNetwork(LEDGER_ROPSTEN)}
                danger
              >
                Test
              </Button>
              <Button
                id="ledger-production"
                onClick={() => this.setNetwork(LEDGER_MAIN)}
                danger
              >
                Production
              </Button>
            </div>
          )}

          {selectedNetwork === "" ? (
            <div>
              <Button
                id="metamask"
                onClick={() => this.setNetwork(INJECTED)}
                danger
              >
                Metamask
              </Button>
              <Button id="ledger" onClick={this.selectMain} danger>
                Ledger
              </Button>
            </div>
          ) : (
            <Button id="back" onClick={this.selectBack} buttonOutline>
              <i
                className="fa fa-chevron-left"
                style={{ float: "left" }}
                aria-hidden="true"
              />{" "}
              Back
            </Button>
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
