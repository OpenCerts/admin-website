import { isAddress, toChecksumAddress } from "web3-utils";

// eslint-disable-next-line import/prefer-default-export
export const isValidAddress = address => {
  try {
    return isAddress(toChecksumAddress(address));
  } catch (e) {
    return false;
  }
};

export const validateHash = input => {
  if (input.length === 0) {
    return "Hash cannot be empty.";
  } else if (input.length > 66) {
    return "Length of Merkle Root Hash is too long.";
  } else if (input.length < 66) {
    return "Length of Merkle Root Hash is too short.";
  } else if (input.slice(0, 2) !== "0x") {
    console.log(input.slice(0, 2));
    return "Merkle Root Hash must start with 0x";
  }
  return "";
};

export const validateName = input =>
  input.length === 0 ? `Organization name cannot be empty.` : "";
