import sha256 from "crypto-js/sha256";
import { ec } from "./util/ec";

export interface ITransaction {
  timestamp: number;

  fromAddress: string;
  toAddress: string;
  amount: number;

  signature: string;
}

function create(fromAddress: string, toAddress: string, amount: number) {
  const transaction: ITransaction = {
    timestamp: Date.now(),
    fromAddress,
    toAddress,
    amount,
    signature: ""
  };

  return transaction;
}

function sign(transaction: ITransaction, privateKey: string) {
  const keyPair = ec.keyFromPrivate(privateKey);

  // Only owner of the from address (sender) can sign the transaction
  if (keyPair.getPublic("hex") !== transaction.fromAddress) {
    throw "Only the owner can sign the transaction!";
  }

  const transactionHash = calculateHash(transaction);
  const signature = keyPair.sign(transactionHash, "base64");
  transaction.signature = signature.toDER("hex");
}

function checkValidity(transaction: ITransaction) {
  // Only mining reward transactions don't have a from address, so it's valid
  if (transaction.fromAddress === "") return true;

  // If transaction is not signed with a private key
  if (!transaction.signature) return false;

  // Return result of checking if the transaction was signed with correct private key
  const keyPair = ec.keyFromPublic(transaction.fromAddress, "hex");
  return keyPair.verify(calculateHash(transaction), transaction.signature);
}

function calculateHash(transaction: ITransaction): string {
  return sha256(
    transaction.timestamp +
    transaction.fromAddress +
    transaction.toAddress +
    transaction.amount
  ).toString();
}

export const transaction = {
  create,
  sign,

  checkValidity,
  calculateHash,
}