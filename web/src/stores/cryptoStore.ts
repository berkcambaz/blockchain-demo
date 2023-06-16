import { blockchain, IBlockchain } from "@core/blockchain";
import { transaction } from "@core/transaction";
import { wallet } from "@core/wallet";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const _blockchain = blockchain.create(2, 100);

const minerWallet = wallet.create();
const wallet1 = wallet.create();
const wallet2 = wallet.create();

await blockchain.minePendingTransactions(_blockchain, minerWallet.public);

const tx1 = transaction.create(minerWallet.public, wallet1.public, 25);
transaction.sign(tx1, minerWallet.private);
await blockchain.addTransaction(_blockchain, tx1);

const tx2 = transaction.create(minerWallet.public, wallet2.public, 25);
transaction.sign(tx2, minerWallet.private);
await blockchain.addTransaction(_blockchain, tx2);

await blockchain.minePendingTransactions(_blockchain, minerWallet.public);

export interface CryptoStoreState {
  blockchain: IBlockchain;
}

export interface CryptoStoreAction {

}

const initialState: CryptoStoreState = {
  blockchain: _blockchain,
};

export const useCryptoStore = create(
  immer<CryptoStoreState & CryptoStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
