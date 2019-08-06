export const initialState = {
  certificateValidity: {}
};

// Actions
export const types = {
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
        certificateValidity: action.payload
      };
    case types.VALIDATE_CERTIFICATE_FAILURE:
      return {
        ...state,
        certificateValidity: {}
      };
    default:
      return state;
  }
}

// Action Creators
export function verifyCertificateValidity({ payload }) {
  return {
    type: types.VALIDATE_CERTIFICATE,
    payload
  };
}

// Selectors
export function getCertificateValidity(store) {
  return store.api.certificateValidity;
}
