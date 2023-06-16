import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AppStoreState {
  route: "blockchain" | "transactions" | "wallets" | "any";
}

export interface AppStoreAction {

}

const initialState: AppStoreState = {
  route: "any",
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
