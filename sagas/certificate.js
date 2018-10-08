import _ from "lodash";
import { put } from "redux-saga/effects";
import { types } from "../reducers/certificate";
import CertificateStoreDefinition from "../services/contracts/CertificateStore.json";

import { getSelectedWeb3 } from "./application";

export function* loadCertificateContract({ payload }) {
  const contractStoreAddress = _.get(
    payload,
    "verification.contractAddress",
    null
  );

  try {
    const { abi } = CertificateStoreDefinition;
    const web3 = yield getSelectedWeb3();
    const contract = new web3.eth.Contract(abi, contractStoreAddress);
    // Hack to allow React Dev Tools to print contract object
    contract.toJSON = () =>
      `Contract Functions: ${Object.keys(contract).join("(), ")}()`;
    yield put({
      type: types.LOADING_STORE_SUCCESS,
      payload: { contract }
    });
  } catch (e) {
    yield put({
      type: types.LOADING_STORE_FAILURE,
      payload: e
    });
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
}

export default loadCertificateContract;
