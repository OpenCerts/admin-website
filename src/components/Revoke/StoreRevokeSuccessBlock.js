import React from "react";
import PropTypes from "prop-types";
import { OrangeButton } from "../UI/Button";
import HashColor from "../UI/HashColor";

const StoreRevokeSuccessBlock = ({ revokedTx, networkId, handleBack }) => (
  <div className="mt2 tc">
    <h3 className="text-green">
      Successfully revoked a certificate/certificate batch.
    </h3>
    <div className="mb4">
      <b>Transaction ID:</b>
      <HashColor hashee={revokedTx} networkId={networkId} isTx />
    </div>
    <OrangeButton variant="rounded" onClick={handleBack}>
      Revoke Another Certificate
    </OrangeButton>
  </div>
);

export default StoreRevokeSuccessBlock;

StoreRevokeSuccessBlock.propTypes = {
  revokedTx: PropTypes.bool,
  networkId: PropTypes.string,
  handleBack: PropTypes.func
};
