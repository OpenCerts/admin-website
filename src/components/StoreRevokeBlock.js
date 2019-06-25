import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";
import { isValidHash } from "../components/utils";

class StoreRevokeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: "",
      certificateHashIsValid: true
    };

    this.onHashChange = this.onHashChange.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value,
      certificateHashIsValid: isValidHash(event.target.value)
    });
  }

  render() {
    const { revokedTx, networkId } = this.props;
    const certificateHashMessage = this.state.certificateHashIsValid
      ? ""
      : "Merkle Root Hash is not valid.";

    const onRevokeClick = () => {
      const {
        adminAddress,
        storeAddress,
        handleCertificateRevoke
      } = this.props;
      const { certificateHash, certificateHashIsValid } = this.state;

      this.setState({
        certificateHashIsValid: isValidHash(certificateHash)
      });
      if (isValidHash(certificateHash) && certificateHashIsValid) {
        const yes = window.confirm(
          "Are you sure you want to revoke this hash?"
        ); // eslint-disable-line
        if (yes) {
          handleCertificateRevoke({
            storeAddress,
            fromAddress: adminAddress,
            certificateHash: this.state.certificateHash
          });
        }
      }
    };

    return (
      <div>
        <div>
          Certificate hash to revoke
          <HashColorInput
            className="mt2"
            variant="pill"
            type="hash"
            hashee={this.state.certificateHash}
            onChange={this.onHashChange}
            value={this.state.certificateHash}
            message={certificateHashMessage}
            placeholder="0x…"
          />
        </div>
        <OrangeButton variant="pill" className="mt4" onClick={onRevokeClick}>
          <i className="fas fa-exclamation-triangle" />
          &nbsp;
          {this.props.revokingCertificate ? "Revoking…" : "Revoke"}
        </OrangeButton>

        {revokedTx ? (
          <div className="mt5">
            <p>Revoked certificate batch.</p>
            <div>
              Transaction ID
              <HashColor hashee={revokedTx} networkId={networkId} isTx />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreRevokeBlock;

StoreRevokeBlock.propTypes = {
  revokingCertificate: PropTypes.bool,
  revokedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  handleCertificateRevoke: PropTypes.func,
  networkId: PropTypes.number
};
