import { IWallet } from "@core/wallet";

export interface IAppWallet {
  name: string;
  keys: IWallet;
}