import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import {
  updateWeb3,
  getNetwork,
  getCustomRpc,
  setIsLoading
} from "../reducers/application";
import { NETWORK_TYPES } from "../config";
import { white } from "./../styles/variables";

const divBase = css`
  border-radius: 50px;
  padding: 0.2em 0.5em;
  width: 13em;
`;

const selectorBase = css`
  width: 100%;
  background: ${white};
  border: none;
  font-size: 15px;
  :focus {
    outline: 0;
  }
`;

class AdminContainer extends Component {
  constructor(props) {
    super(props);

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }

  handleNetworkChange(e) {
    this.props.setIsLoading();
    this.props.updateWeb3({
      network: e.target.value
    });
  }

  render() {
    const { INJECTED, LEDGER_MAIN, LEDGER_ROPSTEN } = NETWORK_TYPES;
    const { network, style } = this.props;
    return (
      <div className="ba" style={style} css={css(divBase)}>
        <select
          css={css(selectorBase)}
          className="pa2 provider-selector"
          value={network}
          onChange={this.handleNetworkChange}
        >
          <option value={INJECTED}>Metamask</option>
          <option value={LEDGER_MAIN}>Ledger Nano (Mainnet)</option>
          <option value={LEDGER_ROPSTEN}>Ledger Nano (Ropsten)</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  network: getNetwork(store),
  customRpc: getCustomRpc(store)
});

const mapDispatchToProps = dispatch => ({
  updateWeb3: payload => dispatch(updateWeb3(payload)),
  setIsLoading: () => dispatch(setIsLoading())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);

AdminContainer.propTypes = {
  style: PropTypes.object,
  network: PropTypes.string,
  customRpc: PropTypes.string,
  updateWeb3: PropTypes.func,
  setIsLoading: PropTypes.func
};
