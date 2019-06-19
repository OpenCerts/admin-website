import { Selector, ClientFunction } from "testcafe";

fixture("Wallet Provider Selector").page`http://localhost:3000`;

const NetworkSelector = Selector("#network-selector");
const MetamaskButton = Selector("#metamask");
const LedgerButton = Selector("#ledger");
const LedgerTestButton = Selector("#ledger-test");
const LedgerProductionButton = Selector("#ledger-production");
const BackButton = Selector("#back");

test("Is rendered correctly", async t => {
  await t
    .expect(NetworkSelector.textContent)
    .contains("Welcome to OpenCerts Admin Portal");
  await t.expect(MetamaskButton.visible).ok();
  await t.expect(LedgerButton.visible).ok();
});

test("Select Metamask button works", async t => {
  await t.click(MetamaskButton);
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains("/deploy");
});

test("Select Ledger button reveals test and production buttons", async t => {
  await t.click(LedgerButton);
  await t.expect(LedgerTestButton.visible).ok();
  await t.expect(LedgerProductionButton.visible).ok();
  await t.expect(BackButton.visible).ok();
  await t.click(LedgerTestButton);
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains("/deploy");
});
