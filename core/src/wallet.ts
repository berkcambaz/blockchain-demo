import { ec } from "./util/ec"

export interface IWallet {
  public: string;
  private: string;
}

function create(): IWallet {
  const keyPair = ec.genKeyPair();

  return {
    public: keyPair.getPublic("hex"),
    private: keyPair.getPrivate("hex")
  }
}

export const wallet = {
  create,
}