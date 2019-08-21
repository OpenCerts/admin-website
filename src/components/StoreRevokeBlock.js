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
      inputCertificateHash: "",
      certificateHashIsValid: true,
      isModalVisible: false
    };
    this.onHashChange = this.onHashChange.bind(this);
    this.onRevokeClick = this.onRevokeClick.bind(this);
    this.handleCertificateSelected = this.handleCertificateSelected.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.revokeCertificateHash !== this.props.revokeCertificateHash) {
      this.setState({
        inputCertificateHash: this.props.revokeCertificateHash,
        certificateHashIsValid: this.props.revokeCertificateValidity.valid
      });
    }
  }

  getHashStatus() {
    const { hash } = this.props.revokeCertificateValidity;
    const hashStatus = {
      verified: hash ? hash.valid : true,
      verifying: false,
      error: ""
    };
    return hashStatus;
  }

  getIssuedStatus() {
    const { issued } = this.props.revokeCertificateValidity;
    const issuedStatus = {
      verified: issued ? issued.valid : true,
      verifying: false,
      error: ""
    };
    return issuedStatus;
  }

  getRevokedStatus() {
    const { revoked } = this.props.revokeCertificateValidity;
    const revokedStatus = {
      verified: revoked ? revoked.valid : true,
      verifying: false,
      error: ""
    };
    return revokedStatus;
  }

  onHashChange(event) {
    const inputCertificateHash = event.target.value;
    this.setState({
      inputCertificateHash,
      certificateHashIsValid: isValidCertificateHash(inputCertificateHash)
    });
  }

  toggleModal() {
    const { isModalVisible, inputCertificateHash } = this.state;
    this.setState({
      certificateHashIsValid: isValidCertificateHash(inputCertificateHash)
    });
    if (isValidCertificateHash(inputCertificateHash)) {
      this.setState({
        isModalVisible: !isModalVisible
      });
    }
  }

  handleCertificateSelected(payload) {
    this.props.verifyCertificateValidity(payload);
  }

  onRevokeClick() {
    const { adminAddress, storeAddress, handleCertificateRevoke } = this.props;
    const { inputCertificateHash } = this.state;
    if (isValidCertificateHash(inputCertificateHash)) {
      const payload = {
        storeAddress,
        fromAddress: adminAddress,
        certificateHash: inputCertificateHash
      };
      handleCertificateRevoke(payload);
    }
  }

  render() {
    const {
      revokingCertificate,
      certificate,
      inputCertificateHash,
      isModalVisible
    } = this.state;
    const { revokedTx, networkId, isVerifying } = this.props;

    const certificateHashMessage =
      this.state.certificateHashIsValid === true
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
            hashStatus={this.getHashStatus()}
            issuedStatus={this.getIssuedStatus()}
            notRevokedStatus={this.getRevokedStatus()}
            issuerIdentityStatus={this.getIssuedStatus()}
            storeStatus={this.getIssuedStatus()}
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
    dispatch(updateRevokeCertificateHash({ payload }))
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
