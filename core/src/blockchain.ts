import { block, IBlock } from "./block"
import { ITransaction, transaction } from "./transaction";

export interface IBlockchain {
  chain: IBlock[];
  pendingTransactions: ITransaction[];

  difficulty: number;
  miningReward: number;
}

function create(difficulty: number, miningReward: number) {
  const blockchain: IBlockchain = {
    chain: [createGenesisBlock()],
    pendingTransactions: [],

    difficulty,
    miningReward,
  };

  return blockchain;
}

function addTransaction(_blockchain: IBlockchain, _transaction: ITransaction) {
  if (!_transaction.fromAddress || !_transaction.toAddress) {
    throw "Transactions must have a from address and a to address!";
  }

  if (!transaction.checkValidity(_transaction)) {
    throw "Cannot add invalid transaction to the chain!";
  }

  if (_transaction.amount <= 0) {
    throw "Transaction amount must be higher than 0!";
  }

  // Make sure sender's balance is more or equal to the transactin amount
  const walletBalance = getAddressBalance(_blockchain, _transaction.fromAddress);
  if (walletBalance < _transaction.amount) {
    throw "The sender does not have enough balance!";
  }

  // Get all pending transactions of this sender
  const walletPendingTransactions = _blockchain.pendingTransactions.filter(
    tx => tx.fromAddress === _transaction.fromAddress
  );

  // If wallet has other pending transactions, also include that in the balance calculation
  if (walletPendingTransactions.length > 0) {
    const totalPendingAmount = walletPendingTransactions
      .map(tx => tx.amount)
      .reduce((prev, curr) => prev + curr)

    const totalAmount = totalPendingAmount + _transaction.amount;
    if (totalAmount > walletBalance) {
      throw "The sender does not have enough balance (check pending transactions)!";
    }
  }

  _blockchain.pendingTransactions.push(_transaction);
}

async function minePendingTransactions(_blockchain: IBlockchain, minerAddress: string) {
  // Create & add the "mining reward" transaction, it has no sender and receiver is the miner
  let rewardTransaction = transaction.create("", minerAddress, _blockchain.miningReward);
  _blockchain.pendingTransactions.push(rewardTransaction);

  // Create the block containing all pending transactions and mine it
  let _block = block.create(Date.now(), _blockchain.pendingTransactions, getLatestBlock(_blockchain).hash);
  await block.mine(_blockchain, _block);

  // After the new block is mined, add it to the chain and clear "pending transactions"
  _blockchain.chain.push(_block);
  _blockchain.pendingTransactions = [];
}

function getLatestBlock(_blockchain: IBlockchain): IBlock {
  const block = _blockchain.chain[_blockchain.chain.length - 1];
  if (!block) throw "Could not get the latest block!";

  return block;
}

function getAddressBalance(_blockchain: IBlockchain, address: string): number {
  let balance = 0;

  for (const block of _blockchain.chain) {
    for (const transaction of block.transactions) {
      // If address is from address, the address has sent coins
      if (transaction.fromAddress === address) balance -= transaction.amount;

      // If address is to address, the address has received coins
      if (transaction.toAddress === address) balance += transaction.amount;
    }
  }

  return balance;
}

function checkValidity(_blockchain: IBlockchain): boolean {
  // Check the "Genesis Block"
  if (JSON.stringify(_blockchain.chain[0]) !== JSON.stringify(createGenesisBlock())) {
    return false;
  }

  // Start "i" from 1 as the first block is the "Genesis Block"
  for (let i = 1; i < _blockchain.chain.length; ++i) {
    const currentBlock = _blockchain.chain[i];
    const previousBlock = _blockchain.chain[i - 1];

    // If any one of the block is undefined
    if (!currentBlock || !previousBlock) return false;

    // Check if the block is valid
    if (!block.checkValidity(currentBlock)) return false;

    // If current block doesn't point to the previous block
    if (currentBlock.previousHash !== previousBlock.hash) return false;

    // If current block's contents are tampered
    if (currentBlock.hash !== block.calculateHash(currentBlock)) return false;
  }

  return true;
}

function createGenesisBlock() {
  return block.create(Date.now(), [], "");
}

export const blockchain = {
  create,

  addTransaction,
  minePendingTransactions,

  getLatestBlock,
  getAddressBalance,
  checkValidity,
  createGenesisBlock,
}