import { ec } from "./util/ec"

function create() {
  const keyPair = ec.genKeyPair();

  return {
    public: keyPair.getPublic("hex"),
    private: keyPair.getPrivate("hex")
  }
}

export const wallet = {
  create,
}