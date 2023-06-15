import { blockchain } from "./blockchain";
import { transaction } from "./transaction";
import { wallet } from "./wallet";

async function main() {
  const dorbyte = blockchain.create(2, 100);

  const wallet1 = wallet.create();
  const wallet2 = wallet.create();

  const tx1 = transaction.create(wallet1.public, wallet2.public, 100);
  transaction.sign(tx1, wallet1.private);
  blockchain.addTransaction(dorbyte, tx1);

  await blockchain.minePendingTransactions(dorbyte, "miner-address");

  console.log(await blockchain.getAddressBalance(dorbyte, wallet2.public))

  console.log(JSON.stringify(dorbyte, null, 4));
}

main()