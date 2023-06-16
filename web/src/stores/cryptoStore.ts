import { IAppWallet } from "@/components/types/wallet";
import { blockchain, IBlockchain } from "@core/blockchain";
import { transaction } from "@core/transaction";
import { wallet } from "@core/wallet";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const _blockchain: IBlockchain = blockchain.create(2, 100);

const miner = wallet.create();
const man = wallet.create();
const woman = wallet.create();
const _wallets: IAppWallet[] = [
  { name: "Miner", keys: miner },
  { name: "Man", keys: man },
  { name: "Woman", keys: woman },
];

await blockchain.minePendingTransactions(_blockchain, miner.public);

const tx1 = transaction.create(miner.public, man.public, 25);
transaction.sign(tx1, miner.private);
blockchain.addTransaction(_blockchain, tx1);

const tx2 = transaction.create(miner.public, woman.public, 25);
transaction.sign(tx2, miner.private);
blockchain.addTransaction(_blockchain, tx2);

await blockchain.minePendingTransactions(_blockchain, miner.public);

export interface CryptoStoreState {
  blockchain: IBlockchain;
  wallets: IAppWallet[];
}

export interface CryptoStoreAction {

}

const initialState: CryptoStoreState = {
  blockchain: _blockchain,
  wallets: _wallets,
};

export const useCryptoStore = create(
  immer<CryptoStoreState & CryptoStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
