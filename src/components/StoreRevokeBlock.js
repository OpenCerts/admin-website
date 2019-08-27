import React, { Component } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";
import Modal from "./UI/Modal";
import { isValidCertificateHash } from "../components/utils";
import Divider from "./UI/Divider";
import CertificateDropZone from "./CertificateDropZone";
import {
  getVerifyingRevokeCertificate,
  getRevokeCertificateHash,
  getRevokeCertificateValidity,
  updateRevokeCertificateHash,
  verifyRevokeCertificateValidity
} from "../reducers/revoke";
import { RedButton } from "./UI/Button";

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
      isModalVisible: false,
      isInputActive: false
    };
    this.onHashChange = this.onHashChange.bind(this);
    this.onRevokeClick = this.onRevokeClick.bind(this);
    this.handleCertificateSelected = this.handleCertificateSelected.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal() {
    const { isModalVisible, inputCertificateHash, isInputActive } = this.state;
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
        isModalVisible: !isModalVisible
      });
    }
  }

  handleCertificateSelected(payload) {
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
      this.toggleModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.revokeCertificateHash !== this.props.revokeCertificateHash) {
      this.setState({
        isInputActive: false
      });
      this.toggleModal();
    }
  }

  render() {
    const {
      revokingCertificate,
      inputCertificateHash,
      certificate,
      isModalVisible,
      certificateHashIsValid
    } = this.state;
    const { revokedTx, networkId, verifyingRevokeCertificate } = this.props;

    const certificateHashMessage = certificateHashIsValid
      ? ""
      : "Merkle root/target hash is not valid.";

    return (
      <React.Fragment>
        <div>
          Certificate or batch hash to revoke
          <HashColorInput
            className="mt2"
            variant="pill"
            type="hash"
            hashee={inputCertificateHash}
            onChange={this.onHashChange}
            value={inputCertificateHash}
            message={certificateHashMessage}
            placeholder="0x…"
          />
        </div>
        <RedButton
          variant="pill"
          onClick={this.toggleModal}
          disabled={revokingCertificate}
        >
          {revokingCertificate ? "Revoking…" : "Revoke"}
        </RedButton>
        <Modal
          className="mt4"
          titleText="Revoke Confirmation"
          confirmText="Revoke"
          isOpen={isModalVisible}
          toggleModal={this.toggleModal}
          confirmOnClick={this.onRevokeClick}
        >
          <p>Are you sure you want to revoke this certificate?</p>
        </Modal>
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

        {revokedTx ? (
          <div className="mt5">
            <p>Revoked certificate batch.</p>
            <div>
              Transaction ID
              <HashColor hashee={revokedTx} networkId={networkId} isTx />
            </div>
          </div>
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
