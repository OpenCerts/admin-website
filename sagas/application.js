import { put, select, take, call, fork, cancel, all } from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  getNetwork,
  getNetworkPending,
  types,
  getTxPollingList,
  getCurrentBlockNumber,
  getNetworkPollingTask,
  foundNewBlock,
  announceMinedTransaction
} from "../reducers/application";
import { setNewWeb3, getCurrentWeb3 } from "../services/web3/getWeb3";

import { intersection, find } from "lodash";

const POLLING_INTERVAL = 4000; // milliseconds

export function* getSelectedWeb3(getNew = false) {
  const networkPending = yield select(getNetworkPending);
  if (networkPending && !getNew) {
    // block if there's a network update pending
    yield take(types.UPDATE_NETWORK_ID_SUCCESS);
  }
  const network = yield select(getNetwork);
  const web3 = yield getNew ? setNewWeb3(network) : getCurrentWeb3(); // update web3 only if requested specifically
  return web3;
}

export function* startNetworkPolling() {
  const network = yield select(getNetwork);
  let init = true;
  console.log("starting polling for ", network);
  while (true) {
    const web3 = yield getCurrentWeb3();
    const currentBlockNumber = yield select(getCurrentBlockNumber);
    const newBlockNumber = yield web3.eth.getBlockNumber();
    console.log("blockno", newBlockNumber);
    if (init || newBlockNumber > currentBlockNumber) {
      let numberOfNewBlocks = newBlockNumber - currentBlockNumber; // sometimes blocks are skipped
      if (init) {
        numberOfNewBlocks = 1; // if we're init-ing then only fetch one
      }
      console.log("newblockcount", numberOfNewBlocks);
      let fetchBlockNumber = newBlockNumber - numberOfNewBlocks + 1; // get the block after our most recent
      while (fetchBlockNumber <= newBlockNumber) {
        const newBlockContents = yield web3.eth.getBlock(
          fetchBlockNumber,
          true
        );

        // sometimes web3.eth.getblock() comes up null... do-over when that happens
        if (newBlockContents !== null) {
          yield put(
            foundNewBlock({
              blockNumber: fetchBlockNumber,
              blockContents: newBlockContents
            })
          );

          fetchBlockNumber += 1;
        } else {
          console.error(
            "web3.eth.getblock() gave null for ",
            fetchBlockNumber,
            ". Retrying"
          );
        }
        init = false;
      }
    }
    yield call(delay, POLLING_INTERVAL);
  }
}

export function* updateNetworkId() {
  try {
    const networkPollingTask = yield select(getNetworkPollingTask);
    console.log(networkPollingTask);
    if (networkPollingTask) {
      yield cancel(networkPollingTask);
    }
    const web3 = yield getSelectedWeb3(true);
    const networkId = yield web3.eth.net.getId();

    let networkIdVerbose;

    switch (networkId) {
      case 1:
        networkIdVerbose = "Main";
        break;
      case 2:
        networkIdVerbose = "Morden";
        break;
      case 3:
        networkIdVerbose = "Ropsten";
        break;
      case 4:
        networkIdVerbose = "Rinkeby";
        break;
      case 42:
        networkIdVerbose = "Kovan";
        break;
      default:
        networkIdVerbose = `Custom Network: ${networkId}`;
    }
    const providerPollingTask = yield fork(startNetworkPolling);
    yield put({
      type: types.UPDATE_NETWORK_ID_SUCCESS,
      payload: {
        networkId,
        networkIdVerbose,
        providerPollingTask
      }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: types.UPDATE_NETWORK_ID_FAILURE,
      payload: e
    });
  }
}

export function* addTxHashToPolling({ payload }) {
  yield put({
    type: types.TX_POLLING_ADD,
    payload: {
      txHash: payload
    }
  });
}

export function* checkNewBlockForTxPollList({ payload }) {
  const { transactions } = payload.blockContents;
  if (transactions && transactions.length) {
    const blockTransactionHashList = transactions.map(
      transactionObj => transactionObj.hash
    );

    console.log(blockTransactionHashList);

    const txPollingList = yield select(getTxPollingList);

    console.log("polling list", Object.keys(txPollingList));
    const ourTransactions = intersection(
      Object.keys(txPollingList),
      blockTransactionHashList
    );

    if (ourTransactions.length) {
      // found our transactions in new block

      const announcementActions = ourTransactions.map(ourTx =>
        put(
          announceMinedTransaction({
            txHash: ourTx,
            txReceipt: find(transactions, ["hash", ourTx])
          })
        )
      );

      yield all(announcementActions);
    }
  }

  yield "moo";
}

/*
Polling state machine:
init: do not poll, init txlist[] with empty

receive tx to poll: add txhash to txlist if not already in it, start polling if not already polling
remove tx from poll: remove txhash from txlist, if txlist empty stop polling

*/
export default updateNetworkId;
