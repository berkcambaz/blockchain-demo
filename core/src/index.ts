import { blockchain } from "./blockchain";
import { transaction } from "./transaction";

async function main() {
  const dorbyte = blockchain.create(2, 100);

  blockchain.createTransaction(dorbyte, transaction.create("address1", "address2", 100))
  blockchain.createTransaction(dorbyte, transaction.create("address2", "address1", 10))

  await blockchain.minePendingTransactions(dorbyte, "miner-address")

  console.log(JSON.stringify(dorbyte, null, 4));
}

main()