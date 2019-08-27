import { call, put, take, select } from "redux-saga/effects";
import { types } from "../reducers/revoke";
import { getSelectedWeb3 } from "./application";
import { types as adminTypes } from "../reducers/admin";
import DocumentStoreDefinition from "../services/contracts/DocumentStore.json";
import { sendTxWrapper } from "./admin";
import {
  types as applicationTypes,
  getTransactionReceipt
} from "../reducers/application";
import { API_URL } from "../config";
import { getLogger } from "../logger";

const { error } = getLogger("revoke.js:");

export function* revokeCertificate({ payload }) {
  try {
    const { fromAddress, storeAddress, certificateHash } = payload;
    const web3 = yield getSelectedWeb3();
    const { abi } = DocumentStoreDefinition;
    const contract = new web3.eth.Contract(abi, storeAddress, {
      from: fromAddress
    });
    const revokeMsg = contract.methods.revoke(certificateHash);
    const gasPrice = (yield web3.eth.getGasPrice()) * 5;
    const gasLimit = (yield revokeMsg.estimateGas()) * 2;

    const txHash = yield sendTxWrapper({
      txObject: revokeMsg,
      gasPrice,
      gasLimit,
      fromAddress
    });

    yield put({
      type: types.REVOKING_CERTIFICATE_TX_SUBMITTED,
      payload: txHash
    });

    let txReceipt;

    while (!txReceipt) {
      yield take(applicationTypes.TRANSACTION_MINED);
      txReceipt = yield select(getTransactionReceipt, txHash); // this returns undefined if the transaction mined doesn't match the txHash we're waiting for
    }
    yield put({
      type: types.REVOKING_CERTIFICATE_SUCCESS,
      payload: txReceipt.transactionHash
    });
  } catch (e) {
    yield put({
      type: types.REVOKING_CERTIFICATE_FAILURE,
      payload: e.message
    });
    error("revokeCertificate:", e);
  }
}

export function* setVerifyingRevokeCertificate() {
  yield put({
    type: types.VERIFYING_REVOKE_CERTIFICATE
  });
}

export function* setNotVerifyingRevokeCertificate() {
  yield put({
    type: types.NOT_VERIFYING_REVOKE_CERTIFICATE
  });
}

async function verifyCertificateApi(payload) {
  const certificateValidity = await fetch(`${API_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ document: payload })
  })
    .then(response => response.json())
    .catch(e => error("certificateValidity:", e));
  return certificateValidity;
}

export function* verifyCertificateValidity({ payload }) {
  try {
    yield put({
      type: types.VERIFYING_REVOKE_CERTIFICATE
    });
    const validity = yield call(verifyCertificateApi, payload);
    yield put({
      type: types.VALIDATE_CERTIFICATE_SUCCESS,
      payload: validity
    });
    yield put({
      type: types.NOT_VERIFYING_REVOKE_CERTIFICATE
    });
    if (validity.valid) {
      yield put({
        type: types.UPDATE_REVOKE_CERTIFICATE_HASH,
        payload: `0x${payload.signature.targetHash}`
      });
    }
  } catch (e) {
    yield put({
      type: types.VALIDATE_CERTIFICATE_FAILURE,
      payload: e.message
    });
    yield put({
      type: adminTypes.NOT_VERIFYING_REVOKE_CERTIFICATE
    });
    error("verifyCertificateValidity:", e);
  }
}

export default verifyCertificateValidity;
