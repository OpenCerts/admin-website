import { isValidAddress, isValidCertificateHash } from "./utils";

describe("isValidAddress validator", () => {
  it("should return true for address with correct checksum", () => {
    expect(isValidAddress("0xeaf9503a6555f6cfbf2feb83a6c51a38b641ff9a")).toBe(
      true
    );
  });

  it("should return true for address with incorrect checksum", () => {
    expect(isValidAddress("0xeaf9503a6555f6cfbf2feb83a6c51a38b641ff9A")).toBe(
      true
    );
  });

  it("should return true for addresses without 0x", () => {
    expect(isValidAddress("eaf9503a6555f6cfbf2feb83a6c51a38b641ff9A")).toBe(
      true
    );
  });

  it("should return false for non-addresses", () => {
    expect(isValidAddress("00")).toBe(false);
    expect(isValidAddress("eaf9503a6555f6cfbf2feb83a6c51a38b641ff")).toBe(
      false
    );
  });
});

describe("isValidCertificateHash validator", () => {
  it("should return true for address with correct checksum", () => {
    expect(
      isValidCertificateHash(
        "0x6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27d"
      )
    ).toBe(true);
  });

  it("should return false for address with wrong length", () => {
    expect(
      isValidCertificateHash(
        "0x6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27"
      )
    ).toBe(false);
  });

  it("should return false for addresses without 0x", () => {
    expect(
      isValidCertificateHash(
        "6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27d"
      )
    ).toBe(false);
  });

  it("should return false for non-addresses", () => {
    expect(isValidCertificateHash("00")).toBe(false);
    expect(
      isValidCertificateHash("eaf9503a6555f6cfbf2feb83a6c51a38b641ff")
    ).toBe(false);
  });
});
