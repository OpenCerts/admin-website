import { put, take, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import { types, getAdminAddress, getAccountBalance } from "../reducers/admin";
import {
  types as applicationTypes,
  getTransactionReceipt
} from "../reducers/application";

import getAccounts from "../services/web3/getAccounts";
import DocumentStoreDefinition from "../services/contracts/DocumentStore.json";

import { getSelectedWeb3 } from "./application";
import { getLogger } from "../logger";

const { error } = getLogger("admin.js:");

export function* loadAdminAddress() {
  try {
    yield put({
      type: applicationTypes.IS_LOADING
    });
    const web3 = yield getSelectedWeb3();
    const accounts = yield getAccounts(web3);

    if (!accounts || !accounts.length || accounts.length === 0)
      throw new Error("Accounts not found");
    yield put({
      type: types.LOADING_ADMIN_ADDRESS_SUCCESS,
      payload: accounts[0]
    });
    yield put({
      type: applicationTypes.IS_NOT_LOADING
    });
  } catch (e) {
    yield put({
      type: types.LOADING_ADMIN_ADDRESS_FAILURE,
      payload: e.message
    });
    yield put({
      type: applicationTypes.IS_NOT_LOADING
    });
    error("loadAdminAddress:", e);
  }
}

export function* loadAccountBalance() {
  try {
    const web3 = yield getSelectedWeb3();
    const adminAddress = yield select(getAdminAddress);
    const balance = yield web3.eth.getBalance(adminAddress);
    const balanceEther = yield web3.utils.fromWei(balance, "ether");
    if (!balanceEther) throw new Error("Balance not found");

    yield put({
      type: types.LOADING_ACCOUNT_BALANCE_SUCCESS,
      payload: parseFloat(balanceEther)
    });
  } catch (e) {
    yield put({
      type: types.LOADING_ACCOUNT_BALANCE_FAILURE,
      payload: e.message
    });
    error("loadAccountBalance:", e);
  }
}

function sendTxWrapper({ txObject, gasPrice, gasLimit, fromAddress, message }) {
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
          const userRejectedMetamask = err.message.includes(
            "User denied transaction signature."
          );
          const userRejectedLedger = err.message.includes("denied by the user");

          if (userRejectedMetamask || userRejectedLedger) {
            toast.error("Transaction was rejected.");
          }
          return reject(err);
        }
        if (message) toast(message);
        return resolve(res);
      }
    );
  });
}

export function* deployStore({ payload }) {
  try {
    const { name } = payload;
    const web3 = yield getSelectedWeb3();
    const accountBalance = yield select(getAccountBalance);
    const adminAddress = yield select(getAdminAddress);
    const { abi, bytecode } = DocumentStoreDefinition;

    const proxyContract = new web3.eth.Contract(abi);
    const deployment = proxyContract.deploy({
      from: adminAddress,
      data: bytecode,
      arguments: [name]
    });
    const gasPrice = (yield web3.eth.getGasPrice()) * 5;
    const gasLimit = (yield deployment.estimateGas()) * 2;
    const transactionCostInEthers = web3.utils.fromWei(
      (gasPrice * gasLimit).toString(),
      "ether"
    );

    if (accountBalance >= transactionCostInEthers) {
      toast("Please confirm the transaction on your wallet/ledger.");
      const txHash = yield sendTxWrapper({
        txObject: deployment,
        gasPrice,
        gasLimit,
        fromAddress: adminAddress
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
      toast.success("Successfully deployed a new certificate store.");
    } else {
      const errorMessage = "Insufficient Ethers in wallet.";
      yield put({
        type: types.DEPLOYING_STORE_FAILURE,
        payload: errorMessage
      });
      toast.error(errorMessage);
    }
  } catch (e) {
    yield put({
      type: types.DEPLOYING_STORE_FAILURE,
      payload: e.message
    });
    error("deployStore:", e);
  }
}

export function* issueCertificate({ payload }) {
  try {
    const { storeAddress, certificateHash } = payload;
    const accountBalance = yield select(getAccountBalance);
    const adminAddress = yield select(getAdminAddress);
    const web3 = yield getSelectedWeb3();

    const { abi } = DocumentStoreDefinition;
    const contract = new web3.eth.Contract(abi, storeAddress, {
      from: adminAddress
    });

    const issueMsg = contract.methods.issue(certificateHash);
    const gasPrice = (yield web3.eth.getGasPrice()) * 5;
    const gasLimit = (yield issueMsg.estimateGas()) * 2;
    const transactionCostInEthers = web3.utils.fromWei(
      (gasPrice * gasLimit).toString(),
      "ether"
    );

    if (accountBalance >= transactionCostInEthers) {
      toast("Please confirm the transaction on your wallet/ledger.");
      const txHash = yield sendTxWrapper({
        txObject: issueMsg,
        gasPrice,
        gasLimit,
        fromAddress: adminAddress
      });

      yield put({
        type: types.ISSUING_CERTIFICATE_TX_SUBMITTED,
        payload: txHash
      });

      let txReceipt;

      while (!txReceipt) {
        yield take(applicationTypes.TRANSACTION_MINED);
        txReceipt = yield select(getTransactionReceipt, txHash); // this returns undefined if the transaction mined doesn't match the txHash we're waiting for
      }

      yield put({
        type: types.ISSUING_CERTIFICATE_SUCCESS,
        payload: txReceipt.transactionHash
      });
      toast.success("Successfully issued certificate(s).");
    } else {
      const errorMessage = "Insufficient Ethers in wallet.";
      yield put({
        type: types.ISSUING_CERTIFICATE_FAILURE,
        payload: errorMessage
      });
      toast.error(errorMessage);
    }
  } catch (e) {
    yield put({
      type: types.ISSUING_CERTIFICATE_FAILURE,
      payload: e.message
    });
    error("issueCertificate:", e);
  }
}

export function* revokeCertificate({ payload }) {
  try {
    const { storeAddress, certificateHash } = payload;
    const adminAddress = yield select(getAdminAddress);
    const accountBalance = yield select(getAccountBalance);
    const web3 = yield getSelectedWeb3();

    const { abi } = DocumentStoreDefinition;
    const contract = new web3.eth.Contract(abi, storeAddress, {
      from: adminAddress
    });
    const revokeMsg = contract.methods.revoke(certificateHash);
    const gasPrice = (yield web3.eth.getGasPrice()) * 5;
    const gasLimit = (yield revokeMsg.estimateGas()) * 2;
    const transactionCostInEthers = web3.utils.fromWei(
      (gasPrice * gasLimit).toString(),
      "ether"
    );

    if (accountBalance >= transactionCostInEthers) {
      toast("Please confirm the transaction on your wallet/ledger.");
      const txHash = yield sendTxWrapper({
        txObject: revokeMsg,
        gasPrice,
        gasLimit,
        fromAddress: adminAddress
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
      toast.success("Successfully revoked certificate(s).");
    } else {
      const errorMessage = "Insufficient Ethers in wallet.";
      yield put({
        type: types.REVOKING_CERTIFICATE_FAILURE,
        payload: errorMessage
      });
      toast.error(errorMessage);
    }
  } catch (e) {
    yield put({
      type: types.REVOKING_CERTIFICATE_FAILURE,
      payload: e.message
    });
    error("revokeCertificate:", e);
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
}

export default loadAdminAddress;
