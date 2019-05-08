import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./style.scss";
import { updateWeb3 } from "../../reducers/application";
import { NETWORK_TYPES } from "../../config";
import Button from "../Button";

const { INJECTED, LEDGER_MAIN, LEDGER_ROPSTEN } = NETWORK_TYPES;

class NetworkSelector extends Component {
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
    Router.push("/panel", "/panel", { shallow: true });
  }

  selectMain() {
    this.setState({
      selectedNetwork: "Main"
    });
  }

  async setNetwork(network) {
    await this.handleNetworkChange(network);
  }

  selectBack() {
    this.setState({
      selectedNetwork: ""
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.selectedNetwork === "Main" && (
            <div>
              <Button onClick={() => this.setNetwork(LEDGER_ROPSTEN)} danger>
                Test
              </Button>
              <Button onClick={() => this.setNetwork(LEDGER_MAIN)} danger>
                Production
              </Button>
            </div>
          )}

          {this.state.selectedNetwork === "" ? (
            <div>
              <Button onClick={() => this.setNetwork(INJECTED)} danger>
                Metamask
              </Button>
              <Button onClick={this.selectMain} danger>
                Main
              </Button>
            </div>
          ) : (
            <Button onClick={this.selectBack} buttonOutline>
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
  updateWeb3: payload => dispatch(updateWeb3(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(NetworkSelector);

NetworkSelector.propTypes = {
  updateWeb3: PropTypes.func,
  rest: PropTypes.object
};
