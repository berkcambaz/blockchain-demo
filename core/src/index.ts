import { block } from "./block";
import { blockchain } from "./blockchain";

const dorbyte = blockchain.create();
blockchain.addBlock(dorbyte, block.create(Date.now(), { amount: 5 }))
blockchain.addBlock(dorbyte, block.create(Date.now(), { amount: 10 }))
console.log(JSON.stringify(dorbyte, null, 4))
console.log(blockchain.checkValidity(dorbyte))