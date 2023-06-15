import sha256 from "crypto-js/sha256";
import { ec } from "./util/ec";

export interface ITransaction {
  fromAddress: string;
  toAddress: string;
  amount: number;

  signature: string;
}

function create(fromAddress: string, toAddress: string, amount: number) {
  const transaction: ITransaction = { fromAddress, toAddress, amount, signature: "" };
  return transaction;
}

function sign(transaction: ITransaction, privateKey: string) {
  const keyPair = ec.keyFromPrivate(privateKey);

  if (keyPair.getPublic("hex") !== transaction.fromAddress) {
    throw "Trying to sign transaction of another wallet!";
  }

  const transactionHash = calculateHash(transaction);
  transaction.signature = keyPair.sign(transactionHash, "base64").toDER("hex");
}

function checkValidity(transaction: ITransaction) {
  // Mining reward transactions don't have a from address
  if (transaction.fromAddress === "") return true;

  // If transaction is not signed with a private key
  if (!transaction.signature) return false;

  const keyPair = ec.keyFromPublic(transaction.fromAddress, "hex");
  return keyPair.verify(calculateHash(transaction), transaction.signature);
}

function calculateHash(transaction: ITransaction): string {
  return sha256(transaction.fromAddress + transaction.toAddress + transaction.amount).toString();
}

export const transaction = {
  create,
  sign,

  checkValidity,
  calculateHash,
}