import Web3 from "web3";
import ProviderEngine from "web3-provider-engine";
import SubscriptionSubprovider from "web3-provider-engine/subproviders/subscriptions";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import createLedgerSubprovider from "@ledgerhq/web3-subprovider";
import WebsocketSubProvider from "web3-provider-engine/subproviders/websocket";
import { NETWORK_TYPES, INFURA_PROJECT_ID } from "../../config";

let web3Instance;
let web3InstanceType;

async function loadWeb3Ledger(mainnet = true) {
  let { web3 } = window;
  const networkId = mainnet ? 1 : 3;
  const rpcUrl = mainnet
    ? `wss://mainnet.infura.io/ws/v3/${INFURA_PROJECT_ID}`
    : `wss://ropsten.infura.io/ws/v3/${INFURA_PROJECT_ID}`;

  const engine = new ProviderEngine();
  const getTransport = () => TransportU2F.create();
  const ledger = createLedgerSubprovider(getTransport, {
    networkId,
    accountsLength: 5
  });
  engine.addProvider(ledger);
  const fetchProvider = new WebsocketSubProvider({ rpcUrl });
  engine.addProvider(fetchProvider);

  const filterAndSubsSubprovider = new SubscriptionSubprovider();
  engine.addProvider(filterAndSubsSubprovider);

  engine.start();
  web3 = new Web3(engine);
  return web3;
}

async function loadWeb3Injected() {
  let { web3 } = window;
  const alreadyInjected = typeof web3 !== "undefined";

  if (!alreadyInjected) throw new Error("Metamask cannot be found");

  web3 = new Web3(web3.currentProvider);

  return web3;
}

async function loadWeb3CustomRpc(rpc = "http://localhost:8545") {
  let { web3 } = window;

  const provider = new Web3.providers.HttpProvider(rpc);
  web3 = new Web3(provider);

  return web3;
}

async function loadWeb3Mock() {
  return {
    eth: {
      currentProvider: {},
      getAccounts: () => []
    }
  };
}

async function resolveWeb3(
  resolve,
  reject,
  t = NETWORK_TYPES.INJECTED,
  config
) {
  try {
    switch (t) {
      case NETWORK_TYPES.INJECTED:
        web3Instance = await loadWeb3Injected();
        break;
      case NETWORK_TYPES.LEDGER_MAIN:
        web3Instance = await loadWeb3Ledger(true);
        break;
      case NETWORK_TYPES.LEDGER_ROPSTEN:
        web3Instance = await loadWeb3Ledger(false);
        break;
      case NETWORK_TYPES.CUSTOM:
        web3Instance = await loadWeb3CustomRpc(config);
        break;
      case NETWORK_TYPES.MOCK:
        web3Instance = await loadWeb3Mock();
        break;
      default:
        web3Instance = await loadWeb3Injected();
    }
    web3InstanceType = t;
    resolve(web3Instance);
  } catch (e) {
    console.error(e);
    reject(e);
  }
}

export function setNewWeb3(t, config) {
  if (
    web3InstanceType === NETWORK_TYPES.LEDGER_MAIN ||
    web3InstanceType === NETWORK_TYPES.LEDGER_ROPSTEN
  ) {
    // we need to kill the engine if the previous web3 instance has a ledger subprovider
    web3Instance.currentProvider.stop();
  }
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    // Server-side rendering fails when trying to access window
    if (typeof window !== "undefined") {
      window.addEventListener(`load`, () => {
        resolveWeb3(resolve, reject, t, config);
      });
      // If document has loaded already, try to get Web3 immediately.
      if (document.readyState === `complete`) {
        resolveWeb3(resolve, reject, t, config);
      }
    }
  });
}

export function getCurrentWeb3(t, config) {
  if (web3Instance) {
    return new Promise(resolve => {
      resolve(web3Instance);
    });
  }
  return setNewWeb3(t, config);
}
