import sha256 from "crypto-js/sha256";
import { IBlockchain } from "./blockchain";
import { ITransaction, transaction } from "./transaction";

export interface IBlock {
  timestamp: number;
  transactions: ITransaction[];

  hash: string;
  previousHash: string;

  nonce: number;
}

function create(timestamp: number, transactions: ITransaction[], previousHash: string) {
  const block: IBlock = {
    timestamp,
    transactions,

    hash: "",
    previousHash,

    nonce: 0,
  };

  block.hash = calculateHash(block);

  return block;
}

function mine(_blockchain: IBlockchain, _block: IBlock): Promise<void> {
  const difficulty = _blockchain.difficulty;
  const zeros = Array(difficulty + 1).join("0");

  return new Promise((resolve, _reject) => {
    while (_block.hash.substring(0, difficulty) !== zeros) {
      // When a block is created, it's hash is calculated by default,
      // so, increase the nonce & only then re-calculate the hash
      _block.nonce++;
      _block.hash = calculateHash(_block);
    }

    resolve();
  });
}

function checkValidity(block: IBlock) {
  for (const _transaction of block.transactions) {
    if (!transaction.checkValidity(_transaction)) return false;
  }

  return true;
}

function calculateHash(block: IBlock): string {
  return sha256(
    block.timestamp +
    JSON.stringify(block.transactions) +
    block.previousHash +
    block.nonce
  ).toString();
}

export const block = {
  create,
  mine,

  checkValidity,
  calculateHash,
}