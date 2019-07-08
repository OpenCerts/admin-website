import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  lightGrey,
  faintOrange,
  brandOrange,
  brandDarkOrange
} from "../styles/variables";
import { isValidAddress } from "./utils";
import {
  loadAdminAddress,
  getAdminAddress,
  loadAccountBalance,
  getAccountBalance,
  deployStore,
  getStoreAddress,
  updateStoreAddress,
  issueCertificate,
  getIssuedTx,
  getRevokedTx,
  revokeCertificate,
  getrevokingCertificate,
  getDeploying,
  getIssuingCertificate,
  getDeployedTx
} from "../reducers/admin";
import {
  getIsLoading,
  setIsNotLoading,
  updateNetworkId,
  getNetworkId
} from "../reducers/application";
import StoreDeployBlock from "./StoreDeployBlock";
import StoreIssueBlock from "./StoreIssueBlock";
import StoreRevokeBlock from "./StoreRevokeBlock";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import Panel from "./UI/Panel";
import NetworkSelectorContainer from "./NetworkSelectorContainer";
import ErrorPage from "./ErrorPage";

const baseStyle = (
  <Global
    styles={css`
      .click-to-refresh {
        transform: rotateZ(0deg);
        transition: transform 1.5s ease-in;
      }
      .click-to-refresh:hover {
        color: ${brandDarkOrange};
      }
      .click-to-refresh:active {
        transform: rotateZ(-360deg);
        transition: transform 0s;
      }
      .click-to-refresh:focus {
        outline: none;
      }

      .tab {
        cursor: pointer;
        border: solid 1px ${lightGrey};
      }

      .tab:hover {
        background-color: ${faintOrange};
      }

      .tab[aria-selected="true"] {
        border-left: solid 4px ${brandOrange};
        color: ${brandOrange};
        border-right: 0;
      }
    `}
  />
);

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.refreshCurrentAddress = this.refreshCurrentAddress.bind(this);
    this.refreshAccountBalance = this.refreshAccountBalance.bind(this);
    this.handleStoreDeploy = this.handleStoreDeploy.bind(this);
    this.storeAddressOnChange = this.storeAddressOnChange.bind(this);
    this.handleCertificateIssue = this.handleCertificateIssue.bind(this);
    this.handleCertificateRevoke = this.handleCertificateRevoke.bind(this);

    this.state = {
      localStoreAddress: ""
    };
  }

  componentDidMount() {
    this.props.setIsNotLoading();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.props.updateNetworkId();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.storeAddress !== this.state.localStoreAddress) {
      this.setState({ localStoreAddress: nextProps.storeAddress });
    }
  }

  storeAddressOnChange(event) {
    const address = event.target.value;
    this.setState({ localStoreAddress: address });
    if (isValidAddress(address)) {
      this.props.updateStoreAddress(address);
    }
  }

  handleStoreDeploy(payload) {
    this.props.deployStore(payload);
  }

  handleCertificateIssue(payload) {
    this.props.issueCertificate(payload);
  }

  handleCertificateRevoke(payload) {
    this.props.revokeCertificate(payload);
  }

  refreshCurrentAddress() {
    this.props.loadAdminAddress();
  }

  refreshAccountBalance() {
    this.props.loadAccountBalance();
  }

  render() {
    const {
      adminAddress,
      accountBalance,
      storeAddress,
      issuingCertificate,
      issuedTx,
      revokingCertificate,
      revokedTx,
      networkId,
      deploying,
      deployedTx
    } = this.props;

    return (
      <React.Fragment>
        {adminAddress ? (
          <React.Fragment>
            <nav className="dt w-100 border-box pa3 ph5-ns bg-white shadow-1-ns">
              <a
                className="dtc v-mid mid-gray link dim w-20"
                href="#"
                title="Home"
              >
                <img
                  src={"../../static/images/logo.svg"}
                  className="dib w20 h2"
                  alt="OpenCerts"
                />
              </a>
              <div className="flex">
                <div className="w-40-ns">
                  <h3 className="ma0">
                    Current Account{" "}
                    <div
                      style={{ cursor: "pointer" }}
                      className="dib click-to-refresh"
                      onClick={this.refreshCurrentAddress}
                      title="Try to grab current account"
                      tabIndex={1}
                    >
                      <i className="fas fa-sync-alt" />
                    </div>
                  </h3>
                  <div className="pa2">
                    {adminAddress ? (
                      <HashColor hashee={adminAddress} networkId={networkId} />
                    ) : (
                      <div className="red">No wallet address found.</div>
                    )}
                  </div>
                </div>
                <div className="w-30-ns">
                  <h3 className="ma0">
                    Account Balance{" "}
                    <div
                      style={{ cursor: "pointer" }}
                      className="dib click-to-refresh"
                      onClick={this.refreshAccountBalance}
                      title="Refresh account balance"
                      tabIndex={1}
                    >
                      <i className="fas fa-sync-alt" />
                    </div>
                  </h3>
                  <div className="pa2">
                    {accountBalance ? (
                      <div>{accountBalance} ETH</div>
                    ) : (
                      <div className="red">Unable to load account balance.</div>
                    )}
                  </div>
                </div>
                <div className="w-10-mns v-mid dtc">
                  <h3 className="ma0">Wallet Provider</h3>
                  <NetworkSelectorContainer className="v-mid" />
                </div>
              </div>
            </nav>
            <Panel>
              {baseStyle}
              <div className="flex">
                <div className="w-50">
                  <h1 className="mt0">Admin</h1>
                </div>
              </div>
              <div className="flex bb pb3">
                <div className="w-50">
                  <h3>Store address</h3>
                  <HashColorInput
                    variant="rounded"
                    type="address"
                    value={this.state.localStoreAddress}
                    onChange={this.storeAddressOnChange}
                    placeholder="Enter existing (0x…), or deploy new instance"
                  />
                </div>
              </div>
              <Tabs className="flex flex-row w-100">
                <TabList className="flex flex-column w-30 list pa0">
                  <Tab
                    className="tab pl3"
                    style={{ borderTopLeftRadius: "5px" }}
                  >
                    <h3>Deploy new instance</h3>
                  </Tab>
                  <Tab className="tab pl3">
                    <h3>Issue certificate batch</h3>
                  </Tab>
                  <Tab
                    className="tab pl3"
                    style={{ borderBottomLeftRadius: "5px" }}
                  >
                    <h3>Revoke certificate</h3>
                  </Tab>
                </TabList>
                <div className="w-70 pa4 pl5">
                  <TabPanel>
                    <StoreDeployBlock
                      adminAddress={adminAddress}
                      storeAddress={storeAddress}
                      handleStoreDeploy={this.handleStoreDeploy}
                      deploying={deploying}
                      networkId={networkId}
                      deployedTx={deployedTx}
                    />
                  </TabPanel>
                  <TabPanel>
                    {storeAddress ? (
                      <StoreIssueBlock
                        networkId={networkId}
                        issuedTx={issuedTx}
                        adminAddress={adminAddress}
                        storeAddress={storeAddress}
                        handleCertificateIssue={this.handleCertificateIssue}
                        issuingCertificate={issuingCertificate}
                      />
                    ) : (
                      <div className="red">Enter a store address first.</div>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {storeAddress ? (
                      <StoreRevokeBlock
                        networkId={networkId}
                        revokingCertificate={revokingCertificate}
                        revokedTx={revokedTx}
                        adminAddress={adminAddress}
                        storeAddress={storeAddress}
                        handleCertificateRevoke={this.handleCertificateRevoke}
                      />
                    ) : (
                      <div className="red">Enter a store address first.</div>
                    )}
                  </TabPanel>
                </div>
              </Tabs>
            </Panel>
          </React.Fragment>
        ) : (
          <ErrorPage />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isLoading: getIsLoading(store),
  adminAddress: getAdminAddress(store),
  accountBalance: getAccountBalance(store),
  storeAddress: getStoreAddress(store),
  issuedTx: getIssuedTx(store),
  revokingCertificate: getrevokingCertificate(store),
  revokedTx: getRevokedTx(store),
  networkId: getNetworkId(store),
  deploying: getDeploying(store),
  deployedTx: getDeployedTx(store),
  issuingCertificate: getIssuingCertificate(store)
});

const mapDispatchToProps = dispatch => ({
  setIsNotLoading: () => dispatch(setIsNotLoading()),
  loadAdminAddress: payload => dispatch(loadAdminAddress(payload)),
  loadAccountBalance: payload => dispatch(loadAccountBalance(payload)),
  updateNetworkId: () => dispatch(updateNetworkId()),
  deployStore: payload => dispatch(deployStore(payload)),
  issueCertificate: payload => dispatch(issueCertificate(payload)),
  revokeCertificate: payload => dispatch(revokeCertificate(payload)),
  updateStoreAddress: payload => dispatch(updateStoreAddress(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);

AdminContainer.propTypes = {
  deploying: PropTypes.bool,
  deployedTx: PropTypes.string,
  updateNetworkId: PropTypes.func,
  loadAdminAddress: PropTypes.func,
  loadAccountBalance: PropTypes.func,
  deployStore: PropTypes.func,
  issueCertificate: PropTypes.func,
  updateStoreAddress: PropTypes.func,
  adminAddress: PropTypes.string,
  accountBalance: PropTypes.string,
  storeAddress: PropTypes.string,
  setIsNotLoading: PropTypes.func,
  issuingCertificate: PropTypes.bool,
  issuedTx: PropTypes.string,
  revokingCertificate: PropTypes.bool,
  revokedTx: PropTypes.string,
  revokeCertificate: PropTypes.func,
  networkId: PropTypes.number
};
