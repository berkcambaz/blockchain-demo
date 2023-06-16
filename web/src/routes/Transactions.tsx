import Transaction from "@/components/blockchain/Transaction";
import { useCryptoStore } from "@/stores/cryptoStore";
import { Card, Flex, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

export default function TransactionsRoute() {
  const params = useParams<{ id: string }>();

  const id = params.id ? parseInt(params.id) : undefined;
  const blockchain = useCryptoStore(state => state.blockchain);
  const block = id !== undefined ? blockchain.chain[id] : undefined;

  return (
    <>
      {block &&
        <Card withBorder>
          <Flex direction="column" gap="xs">

            <Title order={3}>{`Block ${id}`}</Title>

            {block.transactions.map((t, i) => <Transaction transaction={t} index={i} key={t.signature} />)}

          </Flex>
        </Card>
      }

      {!block &&
        <>xy</>
      }
    </>
  )
}