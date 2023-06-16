import Transaction from "@/components/blockchain/Transaction";
import { useCryptoStore } from "@/stores/cryptoStore";
import { Anchor, Button, Card, Flex, NumberInput, Select, Text, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

export default function TransactionsRoute() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const id = params.id ? parseInt(params.id) : undefined;
  const blockchain = useCryptoStore(state => state.blockchain);
  const block = id !== undefined ? blockchain.chain[id] : undefined;
  const isPendingBlock = id === blockchain.chain.length;

  return (
    <>
      {!isPendingBlock && block &&
        <Card withBorder>
          <Flex direction="column" gap="xs">

            <Title order={3}>{`Block ${id}`}</Title>

            <Text truncate>{`Transactions: ${block.transactions.length}`}</Text>

            {block.transactions.map((t, i) => <Transaction transaction={t} index={i} key={t.signature} />)}

          </Flex>
        </Card>
      }

      {!isPendingBlock && !block &&
        <>
          {blockchain.chain.map((block, i) =>
            <Card withBorder key={block.hash}>
              <Flex direction="column" gap="xs">

                <Title order={3}>{`Block ${i}`}</Title>

                <Text truncate>
                  {`Transactions: ${block.transactions.length} `}
                  <Anchor onClick={() => navigate(`/transactions/${i}`)}>See Transactions...</Anchor>
                </Text>

              </Flex>
            </Card>
          )}
        </>
      }

      {(isPendingBlock || !block) &&
        <Card withBorder>
          <Flex direction="column" gap="xs">

            <Title order={3}>{`Block ${blockchain.chain.length}`}</Title>
            <Text truncate>{`Transactions: ${blockchain.pendingTransactions.length}`}</Text>

            {blockchain.pendingTransactions.map((t, i) => <Transaction transaction={t} index={i} key={t.signature} />)}

            <Select label="From Address" data={[{ value: 'react', label: 'React' }]} />
            <Select label="To Address" data={[{ value: 'react', label: 'React' }]} />
            <NumberInput defaultValue={0} label="Amount" />
            <Button>Sign & Create Transaction</Button>

          </Flex>
        </Card>
      }
    </>
  )
}