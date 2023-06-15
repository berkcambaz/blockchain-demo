import { block } from "./block";
import { blockchain } from "./blockchain";

async function main() {
  const dorbyte = blockchain.create(2);
  await blockchain.addBlock(dorbyte, block.create(Date.now(), { amount: 5 }))
  await blockchain.addBlock(dorbyte, block.create(Date.now(), { amount: 10 }))
  await blockchain.addBlock(dorbyte, block.create(Date.now(), { amount: 100 }))
  console.log(JSON.stringify(dorbyte, null, 4))
  console.log(blockchain.checkValidity(dorbyte))
}

main()