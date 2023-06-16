import { IBlock } from "@core/block";
import { Anchor, Card, Flex, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Block({ block, index }: { block: IBlock, index: number }) {
  const navigate = useNavigate();

  return (
    <Card withBorder>
      <Flex direction="column" gap="xs">

        <Title order={3}>{`Block ${index}`}</Title>

        <Text truncate>{`Timestamp: ${block.timestamp}`}</Text>

        <Text truncate>
          {`Transactions: ${block.transactions.length} `}
          <Anchor onClick={() => navigate(`/transactions/${index}`)}>See Transactions...</Anchor>
        </Text>

        <Flex direction="column">
          <Text truncate>{`Previous Hash: ${block.previousHash}`}</Text>
          <Text truncate>{`Hash: ${block.hash}`}</Text>
        </Flex>

        <Text truncate>{`Nonce: ${block.nonce}`}</Text>

      </Flex>
    </Card>
  )
}