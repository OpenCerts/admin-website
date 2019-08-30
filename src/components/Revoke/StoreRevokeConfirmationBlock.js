import React from "react";
import PropTypes from "prop-types";
import { RedAlert } from "../UI/Alert";
import { OrangeOutlineButton, RedButton } from "../UI/Button";

const StoreRevokeConfirmationBlock = ({
  isInputActive,
  inputCertificateHash,
  certificate,
  revokingCertificate,
  handleBack,
  handleRevoke
}) => (
  <React.Fragment>
    <RedAlert>
      <b>Caution!</b> This action cannot be undone. Please proceed with caution.
    </RedAlert>

    {isInputActive ? (
      <div className="mv5 tc">
        Are you sure you want to revoke this certificate/certificate batch?
        <div className="mt3">
          <b>Certificate Hash:</b>
        </div>
        <div className="ma0 f6">{inputCertificateHash}</div>
      </div>
    ) : (
      <div className="tc mv4">
        Are you sure you want to revoke <br />
        <b>
          {`${certificate.data.recipient.name.split(":")[2]}'s ${
            certificate.data.name.split(":")[2]
          }`}
        </b>{" "}
        Certificate?
        <div className="mt3">
          <b>Certificate Hash:</b>
        </div>
        <div className="ma0 f6">{`0x${certificate.signature.targetHash}`}</div>
      </div>
    )}
    <div className="flex-wrap flex-row tc">
      <OrangeOutlineButton variant="rounded" onClick={handleBack}>
        Back
      </OrangeOutlineButton>
      <RedButton
        variant="rounded"
        onClick={handleRevoke}
        disabled={revokingCertificate}
      >
        {revokingCertificate ? "Revoking…" : "Revoke"}
      </RedButton>
    </div>
  </React.Fragment>
);

export default StoreRevokeConfirmationBlock;

StoreRevokeConfirmationBlock.propTypes = {
  isInputActive: PropTypes.bool,
  revokingCertificate: PropTypes.bool,
  inputCertificateHash: PropTypes.string,
  certificate: PropTypes.object,
  handleBack: PropTypes.func,
  handleRevoke: PropTypes.func
};
