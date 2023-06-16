import Transaction from "@/components/blockchain/Transaction";
import { useCryptoStore } from "@/stores/cryptoStore";
import { blockchain } from "@core/blockchain";
import { transaction } from "@core/transaction";
import { Anchor, Button, Card, Flex, NumberInput, Select, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TransactionsRoute() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const id = params.id ? parseInt(params.id) : undefined;

  const _blockchain = useCryptoStore(state => state.blockchain);
  const _wallets = useCryptoStore(state => state.wallets);

  const block = id !== undefined ? _blockchain.chain[id] : undefined;
  const isPendingBlock = id === _blockchain.chain.length;

  const [fromAddress, setFromAddress] = useState<string | null>("");
  const [toAddress, setToAddress] = useState<string | null>("");
  const [amount, setAmount] = useState<number>(0);

  const createTransactions = () => {
    if (!fromAddress || !toAddress) return;

    const wallet = _wallets.filter(w => w.keys.public === fromAddress)[0];
    if (!wallet) return;

    const tx = transaction.create(fromAddress, toAddress, amount);
    transaction.sign(tx, wallet.keys.private);
    useCryptoStore.setState(s => { blockchain.addTransaction(s.blockchain, tx) });

    setFromAddress("");
    setToAddress("");
    setAmount(0);
  }

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
          {_blockchain.chain.map((block, i) =>
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

            <Title order={3}>{`Block ${_blockchain.chain.length}`}</Title>
            <Text truncate>{`Transactions: ${_blockchain.pendingTransactions.length}`}</Text>

            {_blockchain.pendingTransactions.map((t, i) => <Transaction transaction={t} index={i} key={t.signature} />)}

            <Select
              label="From Address"
              data={_wallets.map(w => ({ label: w.name, value: w.keys.public }))}
              value={fromAddress} onChange={setFromAddress}
              withinPortal={true}
            />
            <Select
              label="To Address"
              data={_wallets.map(w => ({ label: w.name, value: w.keys.public }))}
              value={toAddress} onChange={setToAddress}
              withinPortal={true}
            />
            <NumberInput
              label="Amount"
              defaultValue={0} min={0}
              value={amount} onChange={(value) => setAmount(value !== "" ? value : 0)}
            />
            <Button onClick={createTransactions}>Create Transaction</Button>

          </Flex>
        </Card>
      }
    </>
  )
}