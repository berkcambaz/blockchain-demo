import { blockchain, IBlockchain } from "@core/blockchain";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const _blockchain = blockchain.create(2, 100);

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
