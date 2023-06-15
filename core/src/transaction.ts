export interface ITransaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
}

function create(fromAddress: string, toAddress: string, amount: number) {
  const transaction = { fromAddress, toAddress, amount };
  return transaction;
}

export const transaction = {
  create,
}