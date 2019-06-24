import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";
import { validateHash } from "../components/utils";

class StoreIssueBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: ""
    };

    this.onHashChange = this.onHashChange.bind(this);
    this.onIssueClick = this.onIssueClick.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value,
      certificateHashMessage: validateHash(event.target.value)
    });
  }

  onIssueClick() {
    const { adminAddress, storeAddress, handleCertificateIssue } = this.props;
    const { certificateHash, certificateHashMessage } = this.state;
    this.setState({
      certificateHashMessage: validateHash(certificateHash)
    });
    if (certificateHashMessage === "") {
      handleCertificateIssue({
        storeAddress,
        fromAddress: adminAddress,
        certificateHash: this.state.certificateHash
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          Issue certificates with the Merkle root hash
          <HashColorInput
            className="mt2"
            variant="pill"
            type="hash"
            hashee={this.state.certificateHash}
            onChange={this.onHashChange}
            value={this.state.certificateHash}
            message={this.state.certificateHashMessage}
            placeholder="0x…"
          />
        </div>
        <OrangeButton
          variant="pill"
          className="mt4"
          onClick={this.onIssueClick}
          disabled={this.props.issuingCertificate}
        >
          {this.props.issuingCertificate ? "Issuing…" : "Issue"}
        </OrangeButton>

        {this.props.issuedTx && !this.props.issuingCertificate ? (
          <div className="mt5">
            <p>🎉 Batch has been issued.</p>
            <div>
              Transaction ID{" "}
              <HashColor
                hashee={this.props.issuedTx}
                networkId={this.props.networkId}
                isTx
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreIssueBlock;

StoreIssueBlock.propTypes = {
  issuingCertificate: PropTypes.bool,
  issuedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  handleCertificateIssue: PropTypes.func,
  networkId: PropTypes.number
};
