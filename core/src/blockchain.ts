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
  const genesis = block.create(Date.now(), [], "");
  genesis.hash = block.calculateHash(genesis);

  const blockchain: IBlockchain = {
    chain: [genesis],
    pendingTransactions: [],

    difficulty,
    miningReward,
  }

  return blockchain;
}

function addTransaction(_blockchain: IBlockchain, _transaction: ITransaction) {
  if (!_transaction.fromAddress || !_transaction.toAddress) {
    throw "Transactions must have a from and a to address!";
  }

  if (!transaction.checkValidity(_transaction)) {
    throw "Cannot add invalid transactions to the chain!";
  }

  _blockchain.pendingTransactions.push(_transaction);
}

async function minePendingTransactions(_blockchain: IBlockchain, miningRewardAddress: string) {
  let _block = block.create(Date.now(), _blockchain.pendingTransactions, getPreviousBlock(_blockchain).hash);
  await block.mine(_block, _blockchain.difficulty);

  _blockchain.chain.push(_block);
  _blockchain.pendingTransactions = [
    transaction.create("", miningRewardAddress, _blockchain.miningReward)
  ];
}

function getPreviousBlock(_blockchain: IBlockchain): IBlock {
  const block = _blockchain.chain[_blockchain.chain.length - 1];
  if (!block) throw "Previous block doesn't exist!";

  return block;
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

    if (!block.checkValidity(currentBlock)) return false;

    // If current block's contents are tampered
    if (currentBlock.hash !== block.calculateHash(currentBlock)) return false;

    // If current block doesn't point to the previous block
    if (currentBlock.previousHash !== previousBlock.hash) return false;
  }

  return true;
}

export const blockchain = {
  create,

  addTransaction,
  minePendingTransactions,

  getPreviousBlock,
  getAddressBalance,
  checkValidity,
}