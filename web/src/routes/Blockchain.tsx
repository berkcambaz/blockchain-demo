import Block from "@/components/blockchain/Block";
import { useCryptoStore } from "@/stores/cryptoStore";
import { Anchor, Button, Card, Flex, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function BlockchainRoute() {
  const navigate = useNavigate();

  const blockchain = useCryptoStore(state => state.blockchain);
  const blockCount = blockchain.chain.length;

  return (
    <>
      {blockchain.chain.map((block, i) => <Block block={block} index={i} key={block.hash} />)}

      <Card withBorder>
        <Flex direction="column" gap="xs">

          <Title order={3}>{`Block ${blockCount}`}</Title>

          <Text truncate>
            {`Transactions: ${blockchain.pendingTransactions.length} `}
            <Anchor onClick={() => navigate(`/transactions/${blockCount}`)}>See Transactions...</Anchor>
          </Text>

          <Flex>
            <Button>Mine</Button>
          </Flex>

        </Flex>
      </Card>
    </>
  )
}