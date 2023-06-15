import { block, IBlock } from "./block"

export interface IBlockchain {
  chain: IBlock[];
}

function create() {
  // Create the first block, "Genesis Block"
  const genesis = block.create(Date.now(), "Genesis Block");
  genesis.hash = block.calculateHash(genesis);

  const blockchain: IBlockchain = {
    chain: [genesis],
  }

  return blockchain;
}

function addBlock(_blockchain: IBlockchain, _block: IBlock) {
  const previousBlock = _blockchain.chain[_blockchain.chain.length - 1];
  if (!previousBlock) throw "Previous block doesn't exist!";

  _block.previousHash = previousBlock.hash;
  _block.hash = block.calculateHash(_block);
  _blockchain.chain.push(_block);
}

function checkValidity(_blockchain: IBlockchain) {
  // Start "i" from 1 as the first block is the "Genesis Block"
  for (let i = 1; i < _blockchain.chain.length; ++i) {
    const currentBlock = _blockchain.chain[i];
    const previousBlock = _blockchain.chain[i - 1];

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
  checkValidity,
}