import React, { Component } from "react";
import PropTypes from "prop-types";
import CertificateDropZone from "./CertificateDropZone";

class CertificateDropZoneContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileError: false
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
  }

  handleCertificateChange(certificate) {
    this.setState({ fileError: false });
    this.props.handleCertificateValidation(certificate);
  }

  handleFileError() {
    this.setState({ fileError: true });
  }

  resetData() {
    this.props.resetData();
  }

  render() {
    return (
      <CertificateDropZone
        document={this.props.document}
        fileError={this.state.fileError}
        handleCertificateChange={this.handleCertificateChange}
        handleFileError={this.handleFileError}
        verifying={this.props.verifying}
        issuerIdentityStatus={this.props.issuerIdentityStatus}
        hashStatus={this.props.hashStatus}
        issuedStatus={this.props.issuedStatus}
        notRevokedStatus={this.props.notRevokedStatus}
        verificationStatus={this.props.verificationStatus}
        resetData={this.resetData.bind(this)}
        storeStatus={this.props.storeStatus}
      />
    );
  }
}

export default CertificateDropZoneContainer;

CertificateDropZoneContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  document: PropTypes.object,
  handleCertificateValidation: PropTypes.func,
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func,
  resetData: PropTypes.func,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array,
  storeStatus: PropTypes.object
};
