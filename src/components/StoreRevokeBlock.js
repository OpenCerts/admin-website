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
import {
  verifyCertificateValidity,
  getCertificateValidity
} from "../reducers/api";
import Divider from "./UI/Divider";
import CertificateDropZone from "./CertificateDropZone";
import { getIsVerifying } from "../reducers/application";
import {
  getRevokeCertificateHash,
  updateRevokeCertificateHash
} from "../reducers/admin";

const certificateDropzone = css`
  width: 100%;
  text-align: center;
`;

class StoreRevokeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificate: {},
      certificateHashIsValid: true,
      isModalVisible: false
    };
    this.onHashChange = this.onHashChange.bind(this);
    this.onRevokeClick = this.onRevokeClick.bind(this);
    this.handleCertificateSelected = this.handleCertificateSelected.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  getCertificateStatus(certValidator) {
    const validaor = this.props.revokeCertificateValidity[certValidator];
    const status = {
      verified: validaor ? validaor.valid : true,
      verifying: false,
      error: ""
    };
    return status;
  }

  onHashChange(event) {
    const inputCertificateHash = event.target.value;
    this.props.updateRevokeCertificateHash(inputCertificateHash);
  }

  toggleModal() {
    const { isModalVisible } = this.state;
    const { revokeCertificateHash } = this.props;
    this.setState({
      certificateHashIsValid: isValidCertificateHash(revokeCertificateHash)
    });
    if (isValidCertificateHash(revokeCertificateHash)) {
      this.setState({
        isModalVisible: !isModalVisible
      });
    }
  }

  handleCertificateSelected(payload) {
    this.props.verifyCertificateValidity(payload);
  }

  onRevokeClick() {
    const {
      adminAddress,
      storeAddress,
      handleCertificateRevoke,
      revokeCertificateHash
    } = this.props;
    if (isValidCertificateHash(revokeCertificateHash)) {
      const payload = {
        storeAddress,
        fromAddress: adminAddress,
        certificateHash: revokeCertificateHash
      };
      handleCertificateRevoke(payload);
      this.toggleModal();
    }
  }

  render() {
    const {
      revokingCertificate,
      certificate,
      isModalVisible,
      certificateHashIsValid
    } = this.state;
    const {
      revokeCertificateHash,
      revokedTx,
      networkId,
      isVerifying
    } = this.props;

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
            hashee={revokeCertificateHash}
            onChange={this.onHashChange}
            value={revokeCertificateHash}
            message={certificateHashMessage}
            placeholder="0x…"
          />
        </div>
        <Modal
          className="mt4"
          titleText="Revoke Confirmation"
          confirmText="Revoke"
          isOpen={isModalVisible}
          toggleModal={this.toggleModal}
          buttonTextIcon="fa-exclamation-triangle"
          buttonText={revokingCertificate ? "Revoking…" : "Revoke"}
          confirmOnClick={this.onRevokeClick}
          isTriggerDisabled={revokingCertificate}
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
            verifying={isVerifying}
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
  revokeCertificateValidity: getCertificateValidity(store),
  isVerifying: getIsVerifying(store)
});

const mapDispatchToProps = dispatch => ({
  verifyCertificateValidity: payload =>
    dispatch(verifyCertificateValidity({ payload })),
  updateRevokeCertificateHash: payload =>
    dispatch(updateRevokeCertificateHash(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreRevokeBlock);

StoreRevokeBlock.propTypes = {
  revokeCertificateHash: PropTypes.string,
  revokingCertificate: PropTypes.bool,
  updateRevokeCertificateHash: PropTypes.func,
  isVerifying: PropTypes.bool,
  revokedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  verifyCertificateValidity: PropTypes.func,
  revokeCertificateValidity: PropTypes.object,
  handleCertificateRevoke: PropTypes.func,
  networkId: PropTypes.number
};
