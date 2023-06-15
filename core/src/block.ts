import sha256 from "crypto-js/sha256";

export interface IBlock {
  timestamp: number;
  data: any;

  hash: string;
  previousHash: string;

  nonce: number;
}

function create(timestamp: number, data: any) {
  const block: IBlock = {
    timestamp,
    data,

    hash: "",
    previousHash: "",

    nonce: 0,
  }

  return block;
}

function mine(_block: IBlock, difficulty: number): Promise<void> {
  return new Promise((resolve, _reject) => {
    while (_block.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      _block.nonce++;
      _block.hash = calculateHash(_block);
    }

    resolve();
  });
}

function calculateHash(block: IBlock): string {
  return sha256(block.timestamp + JSON.stringify(block.data) + block.previousHash + block.nonce).toString();
}

export const block = {
  create,
  mine,

  calculateHash,
}