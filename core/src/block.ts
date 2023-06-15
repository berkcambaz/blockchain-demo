import sha256 from "crypto-js/sha256";

export interface IBlock {
  timestamp: number;
  data: any;

  hash: string;
  previousHash: string;
}

function create(timestamp: number, data: any) {
  const block: IBlock = {
    timestamp,
    data,

    hash: "",
    previousHash: "",
  }

  return block;
}

function calculateHash(block: IBlock): string {
  return sha256(block.timestamp + JSON.stringify(block.data) + block.previousHash).toString();
}

export const block = {
  create,
  calculateHash,
}