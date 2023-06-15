import { block, IBlock } from "./block"
import { ITransaction, transaction } from "./transaction";

export interface IBlockchain {
  chain: IBlock[];
  pendingTransactions: ITransaction[];

  difficulty: number;
  miningReward: number;
}

function create(difficulty: number, miningReward: number) {
  // Create the first block, "Genesis Block"
  const genesis = block.create(Date.now(), []);
  genesis.hash = block.calculateHash(genesis);

  const blockchain: IBlockchain = {
    chain: [genesis],
    pendingTransactions: [],

    difficulty,
    miningReward,
  }

  return blockchain;
}

function createTransaction(_blockchain: IBlockchain, transaction: ITransaction) {
  _blockchain.pendingTransactions.push(transaction);
}

async function minePendingTransactions(_blockchain: IBlockchain, miningRewardAddress: string) {
  let _block = block.create(Date.now(), _blockchain.pendingTransactions);
  await block.mine(_block, _blockchain.difficulty);

  _blockchain.chain.push(_block);
  _blockchain.pendingTransactions = [
    transaction.create("", miningRewardAddress, _blockchain.miningReward)
  ];
}

async function addBlock(_blockchain: IBlockchain, _block: IBlock) {
  const previousBlock = _blockchain.chain[_blockchain.chain.length - 1];
  if (!previousBlock) throw "Previous block doesn't exist!";

  _block.previousHash = previousBlock.hash;
  await block.mine(_block, _blockchain.difficulty);
  _blockchain.chain.push(_block);
}

function getAddressBalance(_blockchain: IBlockchain, address: string): Promise<number> {
  return new Promise((resolve, _reject) => {
    let balance = 0;

    for (const block of _blockchain.chain) {
      for (const transaction of block.transactions) {
        // If address is from address, the address has sent coins
        if (transaction.fromAddress === address) balance -= transaction.amount;

        // If address is to address, the address has received coins
        if (transaction.toAddress === address) balance += transaction.amount;
      }
    }

    resolve(balance);
  });
}

function checkValidity(_blockchain: IBlockchain) {
  // Start "i" from 1 as the first block is the "Genesis Block"
  for (let i = 1; i < _blockchain.chain.length; ++i) {
    const currentBlock = _blockchain.chain[i];
    const previousBlock = _blockchain.chain[i - 1];

    // If any one of the block is undefined
    if (!currentBlock || !previousBlock) return false;

    // If current block's contents are tampered
    if (currentBlock.hash !== block.calculateHash(currentBlock)) return false;

    // If current block doesn't point to the previous block
    if (currentBlock.previousHash !== previousBlock.hash) return false;
  }

  return true;
}

export const blockchain = {
  create,
  addBlock,

  createTransaction,
  minePendingTransactions,

  getAddressBalance,
  checkValidity,
}