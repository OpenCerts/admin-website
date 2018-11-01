import { put, take, select } from "redux-saga/effects";
import { types } from "../reducers/admin";
import {
  types as applicationTypes,
  getTransactionReceipt
} from "../reducers/application";

import getAccounts from "../services/web3/getAccounts";
import DocumentStoreDefinition from "../services/contracts/DocumentStore.json";

import { getSelectedWeb3 } from "./application";

// TODO do a better estimate
const DEFAULT_GAS = 3000000;

export function* loadAdminAddress() {
  try {
    const web3 = yield getSelectedWeb3();
    const accounts = yield getAccounts(web3);

    if (!accounts || !accounts.length || accounts.length === 0)
      throw new Error("Accounts not found");

    yield put({
      type: types.LOADING_ADMIN_ADDRESS_SUCCESS,
      payload: accounts[0]
    });
  } catch (e) {
    yield put({
      type: types.LOADING_ADMIN_ADDRESS_FAILURE,
      payload: e.message
    });
  }
}

function sendTxWrapper({ txObject, gasPrice, gasLimit, fromAddress }) {
  return new Promise((resolve, reject) => {
    txObject.send(
      {
        from: fromAddress,
        gas: gasLimit,
        gasPrice
      },
      (err, res) => {
        // callback passed into eth.contract.send() to get the txhash
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
}

export function* deployStore({ payload }) {
  try {
    const { fromAddress, name } = payload;
    const web3 = yield getSelectedWeb3();

    const { abi, bytecode } = DocumentStoreDefinition;

    const proxyContract = new web3.eth.Contract(abi);
    const deployment = proxyContract.deploy({
      from: fromAddress,
      data: bytecode,
      arguments: [name]
    });
    const gasPrice = (yield web3.eth.getGasPrice()) * 5;
    const gasLimit = (yield deployment.estimateGas()) * 2;

    const txHash = yield sendTxWrapper({
      txObject: deployment,
      gasPrice,
      gasLimit,
      fromAddress
    });

    yield put({
      type: types.DEPLOYING_STORE_TX_SUBMITTED,
      payload: txHash
    });

    let txReceipt;

    while (!txReceipt) {
      yield take(applicationTypes.TRANSACTION_MINED);
      txReceipt = yield select(getTransactionReceipt, txHash); // this returns undefined if the transaction mined doesn't match the txHash we're waiting for
    }

    yield put({
      type: types.DEPLOYING_STORE_SUCCESS,
      payload: {
        contractAddress: txReceipt.contractAddress,
        txHash: txReceipt.transactionHash
      }
    });
  } catch (e) {
    yield put({
      type: types.DEPLOYING_STORE_FAILURE,
      payload: e.message
    });
    throw e;
  }
}

export function* issueCertificate({ payload }) {
  try {
    const { fromAddress, storeAddress, certificateHash } = payload;
    const web3 = yield getSelectedWeb3();

    const { abi } = DocumentStoreDefinition;
    const contract = new web3.eth.Contract(abi, storeAddress, {
      from: fromAddress
    });

    const gasPrice = (yield web3.eth.getGasPrice()) * 5;
    const issueMsg = contract.methods.issue(certificateHash);

    const tx = yield issueMsg.send({
      from: fromAddress,
      gas: DEFAULT_GAS,
      gasPrice
    });

    const txHash = tx.blockHash;

    yield put({
      type: types.ISSUING_CERTIFICATE_SUCCESS,
      payload: txHash
    });
  } catch (e) {
    yield put({
      type: types.ISSUING_CERTIFICATE_FAILURE,
      payload: e.message
    });
  }
}

export function* revokeCertificate({ payload }) {
  try {
    const { fromAddress, storeAddress, certificateHash } = payload;
    const web3 = yield getSelectedWeb3();

    const { abi } = DocumentStoreDefinition;
    const contract = new web3.eth.Contract(abi, storeAddress, {
      from: fromAddress
    });

    const gasPrice = (yield web3.eth.getGasPrice()) * 5;
    const revokeMsg = contract.methods.revoke(certificateHash);

    const tx = yield revokeMsg.send({
      from: fromAddress,
      gas: DEFAULT_GAS,
      gasPrice
    });

    const txHash = tx.blockHash;

    yield put({
      type: types.REVOKING_CERTIFICATE_SUCCESS,
      payload: txHash
    });
  } catch (e) {
    yield put({
      type: types.REVOKING_CERTIFICATE_FAILURE,
      payload: e.message
    });
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
}

export default loadAdminAddress;
