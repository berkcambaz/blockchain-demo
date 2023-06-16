import { IAppWallet } from "@/components/types/wallet";
import { blockchain, IBlockchain } from "@core/blockchain";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export interface CryptoStoreState {
  blockchain: IBlockchain;
  wallets: IAppWallet[];
  ready: boolean;
}

export interface CryptoStoreAction {
  reset: () => void;
}

const initialState: CryptoStoreState = {
  blockchain: blockchain.create(2, 100),
  wallets: [],
  ready: false,
};

export const useCryptoStore = create(
  immer(
    persist<CryptoStoreState & CryptoStoreAction>(
      (set, _get) => ({
        ...initialState,

        reset: () => {
          set(initialState);
        }
      }),
      {
        name: "crypto"
      }
    )
  )
);
