export const initialState = {
  revokeCertificateValidity: {},
  revokedTx: "",
  revokeCertificateHash: "",
  revokingCertificate: false,
  revokingError: null,
  isVerifyingRevokeCertificate: false
};

// Actions
export const types = {
  UPDATE_REVOKE_CERTIFICATE_HASH: "UPDATE_REVOKE_CERTIFICATE_HASH",

  REVOKING_CERTIFICATE: "REVOKING_CERTIFICATE",
  REVOKING_CERTIFICATE_SUCCESS: "REVOKING_CERTIFICATE_SUCCESS",
  REVOKING_CERTIFICATE_TX_SUBMITTED: "REVOKING_CERTIFICATE_TX_SUBMITTED",
  REVOKING_CERTIFICATE_FAILURE: "REVOKING_CERTIFICATE_FAILURE",

  VERIFYING_REVOKE_CERTIFICATE: "VERIFYING_REVOKE_CERTIFICATE",
  NOT_VERIFYING_REVOKE_CERTIFICATE: "NOT_VERIFYING_REVOKE_CERTIFICATE",

  VALIDATE_CERTIFICATE: "VALIDATE_CERTIFICATE",
  VALIDATE_CERTIFICATE_SUCCESS: "VALIDATE_CERTIFICATE_SUCCESS",
  VALIDATE_CERTIFICATE_FAILURE: "VALIDATE_CERTIFICATE_FAILURE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.VALIDATE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        revokeCertificateValidity: action.payload
      };
    case types.VALIDATE_CERTIFICATE_FAILURE:
      return {
        ...state,
        revokeCertificateValidity: {}
      };
    case types.REVOKING_CERTIFICATE:
      return {
        ...state,
        revokingCertificate: true
      };
    case types.REVOKING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        revokingCertificate: false,
        revokedTx: action.payload,
        revokingError: null
      };
    case types.REVOKING_CERTIFICATE_FAILURE:
      return {
        ...state,
        revokingCertificate: false,
        revokingError: action.payload,
        revokedTx: ""
      };
    case types.UPDATE_REVOKE_CERTIFICATE_HASH:
      return {
        ...state,
        revokeCertificateHash: action.payload
      };
    case types.VERIFYING_REVOKE_CERTIFICATE:
      return {
        ...state,
        isVerifying: true
      };
    case types.NOT_VERIFYING_REVOKE_CERTIFICATE:
      return {
        ...state,
        isVerifying: false
      };
    default:
      return state;
  }
}

// Action Creators
export function verifyRevokeCertificateValidity({ payload }) {
  return {
    type: types.VALIDATE_CERTIFICATE,
    payload
  };
}

export function revokeCertificate(payload) {
  return {
    type: types.REVOKING_CERTIFICATE,
    payload
  };
}

export function updateRevokeCertificateHash(payload) {
  return {
    type: types.UPDATE_REVOKE_CERTIFICATE_HASH,
    payload
  };
}

export function setIsVerifyingRevokeCertificate() {
  return {
    type: types.VERIFYING_REVOKE_CERTIFICATE
  };
}

export function setIsNotVerifyingRevokeCertificate() {
  return {
    type: types.NOT_VERIFYING_REVOKE_CERTIFICATE
  };
}

// Selectors
export function getRevokeCertificateValidity(store) {
  return store.revoke.revokeCertificateValidity;
}

export function getRevokingCertificate(store) {
  return store.revoke.revokingCertificate;
}

export function getRevokeCertificateHash(store) {
  return store.revoke.revokeCertificateHash;
}

export function getVerifyingRevokeCertificate(store) {
  return store.revoke.isVerifying;
}

export function getRevokedTx(store) {
  return store.revoke.revokedTx;
}
