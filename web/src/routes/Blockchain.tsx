import Block from "@/components/blockchain/Block";
import { useCryptoStore } from "@/stores/cryptoStore";

export default function Home() {
  const blockchain = useCryptoStore(state => state.blockchain);

  return (
    <>
      {blockchain.chain.map((block, i) => <Block block={block} index={i} key={block.hash} />)}
    </>
  )
}