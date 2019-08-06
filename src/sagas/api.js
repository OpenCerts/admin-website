import { call, put } from "redux-saga/effects";
import { types } from "../reducers/api";
import { types as appTypes } from "../reducers/application";
import { API_URL } from "../config";
import { getLogger } from "../logger";

const { error } = getLogger("api.js:");

async function fetchApi(payload) {
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
      type: appTypes.IS_VERIFYING
    });
    const validity = yield call(fetchApi, payload);
    yield put({
      type: types.VALIDATE_CERTIFICATE_SUCCESS,
      payload: validity
    });
    yield put({
      type: appTypes.IS_NOT_VERIFYING
    });
  } catch (e) {
    yield put({
      type: types.VALIDATE_CERTIFICATE_FAILURE,
      payload: e.message
    });
    yield put({
      type: appTypes.IS_NOT_VERIFYING
    });
    console.error(e);
  }
}

export default verifyCertificateValidity;
