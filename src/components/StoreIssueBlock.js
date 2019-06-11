import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";

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
      certificateHash: event.target.value
    });
  }

  onIssueClick() {
    const { adminAddress, storeAddress, handleCertificateIssue } = this.props;
    handleCertificateIssue({
      storeAddress,
      fromAddress: adminAddress,
      certificateHash: this.state.certificateHash
    });
  }

  render() {
    const { certificateHash } = this.state;
    const { issuingCertificate, issuedTx, networkId } = this.props;
    return (
      <React.Fragment>
        <div className="mb4">
          Issue certificates with the Merkle root hash
          <HashColorInput
            type="hash"
            hashee={certificateHash}
            onChange={this.onHashChange}
            value={certificateHash}
            placeholder="0x…"
          />
        </div>
        <OrangeButton
          onClick={this.onIssueClick}
          disabled={issuingCertificate}
          variant="pill"
        >
          {issuingCertificate ? "Issuing…" : "Issue"}
        </OrangeButton>

        {issuedTx && !issuingCertificate ? (
          <div className="mt5">
            <p>🎉 Batch has been issued.</p>
            <div>
              Transaction ID{" "}
              <HashColor hashee={issuedTx} networkId={networkId} isTx />
            </div>
          </div>
        ) : null}
      </React.Fragment>
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
