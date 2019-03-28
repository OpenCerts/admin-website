import { isValidAddress } from "./utils";

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
  expect(isValidAddress("eaf9503a6555f6cfbf2feb83a6c51a38b641ff9A")).toBe(true);
});

it("should return false for non-addresses", () => {
  expect(isValidAddress("00")).toBe(false);
  expect(isValidAddress("eaf9503a6555f6cfbf2feb83a6c51a38b641ff")).toBe(false);
});
