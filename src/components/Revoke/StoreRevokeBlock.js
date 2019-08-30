import React, { Component } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HashColorInput from "../UI/HashColorInput";
import { isValidCertificateHash } from "../utils";
import Divider from "../UI/Divider";
import CertificateDropZone from "../CertificateDropZone";
import {
  getVerifyingRevokeCertificate,
  getRevokeCertificateHash,
  getRevokeCertificateValidity,
  updateRevokeCertificateHash,
  verifyRevokeCertificateValidity
} from "../../reducers/revoke";
import { OrangeButton } from "../UI/Button";
import StoreRevokeConfirmationBlock from "./StoreRevokeConfirmationBlock";
import StoreRevokeSuccessBlock from "./StoreRevokeSuccessBlock";

const certificateDropzone = css`
  width: 100%;
  text-align: center;
`;

class StoreRevokeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificate: {},
      inputCertificateHash: "",
      certificateHashIsValid: true,
      page: "revoke",
      isInputActive: false
    };
    this.onHashChange = this.onHashChange.bind(this);
    this.onRevokeClick = this.onRevokeClick.bind(this);
    this.handleCertificateSelected = this.handleCertificateSelected.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  getCertificateStatus(type) {
    const typeStatus = this.props.revokeCertificateValidity[type];
    const status = {
      verified: typeStatus ? typeStatus.valid : true,
      verifying: false,
      error: ""
    };
    return status;
  }

  onHashChange(event) {
    const inputCertificateHash = event.target.value;
    this.setState({
      isInputActive: true,
      certificateHashIsValid: isValidCertificateHash(inputCertificateHash)
    });
    this.setState({ inputCertificateHash });
  }

  handleConfirmation() {
    const { inputCertificateHash, isInputActive } = this.state;
    if (isInputActive) {
      this.setState({
        certificateHashIsValid: isValidCertificateHash(inputCertificateHash)
      });
    }
    const certificateHash = isInputActive
      ? inputCertificateHash
      : this.props.revokeCertificateHash;
    if (isValidCertificateHash(certificateHash)) {
      this.setState({
        page: "confirmation"
      });
    }
  }

  handleCertificateSelected(payload) {
    this.setState({
      certificate: payload
    });
    this.props.verifyRevokeCertificateValidity(payload);
  }

  onRevokeClick() {
    const {
      adminAddress,
      storeAddress,
      handleCertificateRevoke,
      revokeCertificateHash
    } = this.props;
    const { isInputActive, inputCertificateHash } = this.state;
    const certificateHash = isInputActive
      ? inputCertificateHash
      : revokeCertificateHash;

    if (isValidCertificateHash(certificateHash)) {
      const payload = {
        storeAddress,
        fromAddress: adminAddress,
        certificateHash
      };
      handleCertificateRevoke(payload);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.revokedTx !== this.props.revokedTx) {
      this.setState({
        page: "success"
      });
    }
    if (prevProps.revokeCertificateHash !== this.props.revokeCertificateHash) {
      this.setState({
        isInputActive: false
      });
      this.handleConfirmation();
    }
  }

  handleBack() {
    this.setState({
      page: "revoke"
    });
  }

  handleRevokeAnotherCertificate() {
    this.setState({
      page: "revoke",
      inputCertificateHash: ""
    });
  }

  render() {
    const {
      page,
      inputCertificateHash,
      certificate,
      isInputActive,
      certificateHashIsValid
    } = this.state;
    const { revokingCertificate } = this.props;
    const { revokedTx, networkId, verifyingRevokeCertificate } = this.props;

    const certificateHashMessage = certificateHashIsValid
      ? ""
      : "Merkle root/target hash is not valid.";

    return (
      <React.Fragment>
        {page === "revoke" && (
          <React.Fragment>
            <div className="flex-wrap flex-column">
              Certificate or batch hash to revoke
              <div className="flex flex-row">
                <HashColorInput
                  className="mt2 self-start w-100"
                  variant="rounded"
                  type="hash"
                  hashee={inputCertificateHash}
                  onChange={this.onHashChange}
                  value={inputCertificateHash}
                  message={certificateHashMessage}
                  placeholder="0x…"
                />
                <OrangeButton
                  className="self-end w-20"
                  variant="rounded"
                  onClick={this.handleConfirmation}
                  disabled={revokingCertificate}
                >
                  {revokingCertificate ? "Revoking…" : "Revoke"}
                </OrangeButton>
              </div>
            </div>
            <Divider text="OR" />
            <div css={css(certificateDropzone)}>
              <CertificateDropZone
                document={certificate}
                handleCertificateValidation={this.handleCertificateSelected}
                hashStatus={this.getCertificateStatus("hash")}
                issuedStatus={this.getCertificateStatus("issued")}
                notRevokedStatus={this.getCertificateStatus("revoked")}
                issuerIdentityStatus={this.getCertificateStatus("issued")}
                storeStatus={this.getCertificateStatus("issued")}
                verifying={verifyingRevokeCertificate}
              />
            </div>
          </React.Fragment>
        )}

        {page === "confirmation" && (
          <StoreRevokeConfirmationBlock
            isInputActive={isInputActive}
            certificate={certificate}
            revokingCertificate={revokingCertificate}
            handleBack={this.handleBack}
            handleRevoke={this.onRevokeClick}
          />
        )}
        {page === "success" ? (
          <StoreRevokeSuccessBlock
            revokedTx={revokedTx}
            networkId={networkId}
            handleBack={this.handleRevokeAnotherCertificate}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  revokeCertificateHash: getRevokeCertificateHash(store),
  revokeCertificateValidity: getRevokeCertificateValidity(store),
  verifyingRevokeCertificate: getVerifyingRevokeCertificate(store)
});

const mapDispatchToProps = dispatch => ({
  verifyRevokeCertificateValidity: payload =>
    dispatch(verifyRevokeCertificateValidity({ payload })),
  updateRevokeCertificateHash: payload =>
    dispatch(updateRevokeCertificateHash(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreRevokeBlock);

StoreRevokeBlock.propTypes = {
  revokeCertificateHash: PropTypes.string,
  getRevokeCertificateHash: PropTypes.func,
  revokingCertificate: PropTypes.bool,
  updateRevokeCertificateHash: PropTypes.func,
  verifyingRevokeCertificate: PropTypes.bool,
  revokedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  verifyRevokeCertificateValidity: PropTypes.func,
  revokeCertificateValidity: PropTypes.object,
  handleCertificateRevoke: PropTypes.func,
  networkId: PropTypes.number
};
