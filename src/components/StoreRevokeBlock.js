import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";
import { isValidCertificateHash } from "../components/utils";

class StoreRevokeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: "",
      certificateHashIsValid: true
    };

    this.onHashChange = this.onHashChange.bind(this);
    this.onRevokeClick = this.onRevokeClick.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value,
      certificateHashIsValid: isValidCertificateHash(event.target.value)
    });
  }

  onRevokeClick() {
    const { storeAddress, handleCertificateRevoke } = this.props;
    const { certificateHash } = this.state;

    this.setState({
      certificateHashIsValid: isValidCertificateHash(certificateHash)
    });
    if (isValidCertificateHash(certificateHash)) {
      // eslint-disable-next-line no-alert
      const yes = window.confirm("Are you sure you want to revoke this hash?");
      if (yes) {
        handleCertificateRevoke({
          storeAddress,
          certificateHash
        });
      }
    } else {
      this.setState({
        certificateHashIsValid: isValidCertificateHash(certificateHash)
      });
    }
  }

  render() {
    const { certificateHash, certificateHashIsValid } = this.state;
    const { revokedTx, networkId } = this.props;
    const certificateHashMessage = certificateHashIsValid
      ? ""
      : "Merkle root/target hash is not valid.";

    return (
      <div>
        <div>
          Certificate hash to revoke
          <HashColorInput
            className="mt2"
            variant="pill"
            type="hash"
            hashee={certificateHash}
            onChange={this.onHashChange}
            value={certificateHash}
            message={certificateHashMessage}
            placeholder="0x…"
          />
        </div>
        <OrangeButton
          variant="pill"
          className="mt4"
          onClick={this.onRevokeClick}
        >
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
  handleCertificateRevoke: PropTypes.func,
  networkId: PropTypes.number
};
