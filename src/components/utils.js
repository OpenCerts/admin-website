import { isAddress, toChecksumAddress } from "web3-utils";

// eslint-disable-next-line import/prefer-default-export
export const isValidAddress = address => {
  try {
    return isAddress(toChecksumAddress(address));
  } catch (e) {
    return false;
  }
};

export const isValidCertificateHash = input =>
  /^0x[a-fA-F0-9]{64}$/.test(input);
