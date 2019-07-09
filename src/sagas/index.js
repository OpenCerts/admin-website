import { takeEvery, all } from "redux-saga/effects";

import { types as applicationType } from "../reducers/application";
import * as applicationSaga from "../sagas/application";

import { types as adminType } from "../reducers/admin";
import * as adminSaga from "../sagas/admin";

export default function* rootSaga() {
  yield all([
    takeEvery(adminType.LOADING_ADMIN_ADDRESS, adminSaga.loadAdminAddress),
    takeEvery(
      adminType.LOADING_ADMIN_ADDRESS_SUCCESS,
      adminSaga.loadAccountBalance
    ),
    takeEvery(adminType.LOADING_ACCOUNT_BALANCE, adminSaga.loadAccountBalance),
    takeEvery(applicationType.UPDATE_WEB3, applicationSaga.updateNetworkId),
    takeEvery(
      applicationType.UPDATE_NETWORK_ID,
      applicationSaga.updateNetworkId
    ),
    takeEvery(
      applicationType.UPDATE_NETWORK_ID_SUCCESS,
      adminSaga.loadAdminAddress
    ),
    takeEvery(
      adminType.DEPLOYING_STORE_TX_SUBMITTED,
      applicationSaga.addTxHashToPolling
    ),
    takeEvery(
      adminType.ISSUING_CERTIFICATE_TX_SUBMITTED,
      applicationSaga.addTxHashToPolling
    ),
    takeEvery(
      adminType.REVOKING_CERTIFICATE_TX_SUBMITTED,
      applicationSaga.addTxHashToPolling
    ),
    takeEvery(adminType.DEPLOYING_STORE, adminSaga.deployStore),
    takeEvery(adminType.ISSUING_CERTIFICATE, adminSaga.issueCertificate),
    takeEvery(adminType.REVOKING_CERTIFICATE, adminSaga.revokeCertificate),
    takeEvery(applicationType.UPDATE_WEB3, adminSaga.networkReset),
    takeEvery(
      applicationType.NEW_BLOCK,
      applicationSaga.checkNewBlockForTxPollList
    ),
    takeEvery(applicationType.NEW_BLOCK, adminSaga.loadAccountBalance),
    takeEvery(
      applicationType.TRANSACTION_MINED,
      applicationSaga.removeTxHashFromPolling
    )
    // takeEvery(applicationType.UPDATE_NETWORK_ID_SUCCESS, applicationSaga.startLedgerProviderPolling)
  ]);
}
