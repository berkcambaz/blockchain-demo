import { blockchain } from "./blockchain";
import { transaction } from "./transaction";
import { wallet } from "./wallet";

async function main() {
  const dorbyte = blockchain.create(2, 100);

  const minerWallet = wallet.create();
  const wallet1 = wallet.create();
  const wallet2 = wallet.create();

  await blockchain.minePendingTransactions(dorbyte, minerWallet.public);
  console.log(await blockchain.getAddressBalance(dorbyte, minerWallet.public));

  const tx1 = transaction.create(minerWallet.public, wallet1.public, 25);
  transaction.sign(tx1, minerWallet.private);
  await blockchain.addTransaction(dorbyte, tx1);

  const tx2 = transaction.create(minerWallet.public, wallet2.public, 25);
  transaction.sign(tx2, minerWallet.private);
  await blockchain.addTransaction(dorbyte, tx2);

  await blockchain.minePendingTransactions(dorbyte, minerWallet.public);
  console.log(await blockchain.getAddressBalance(dorbyte, minerWallet.public));

  console.log(JSON.stringify(dorbyte, null, 4));
}

main()