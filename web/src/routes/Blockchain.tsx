import Block from "@/components/blockchain/Block";
import { useCryptoStore } from "@/stores/cryptoStore";
import { blockchain } from "@core/blockchain";
import { Anchor, Button, Card, Flex, Select, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlockchainRoute() {
  const navigate = useNavigate();

  const _blockchain = useCryptoStore(state => state.blockchain);
  const _wallets = useCryptoStore(state => state.wallets);
  const blockCount = _blockchain.chain.length;

  const [minerAddress, setMinerAddress] = useState<string | null>("");

  const mine = () => {
    if (!minerAddress) return;

    useCryptoStore.setState(async (s) => {
      await blockchain.minePendingTransactions(s.blockchain, minerAddress);
    });
  }

  return (
    <>
      {_blockchain.chain.map((block, i) => <Block block={block} index={i} key={block.hash} />)}

      <Card withBorder>
        <Flex direction="column" gap="xs">

          <Title order={3}>{`Block ${blockCount}`}</Title>

          <Text truncate>
            {`Transactions: ${_blockchain.pendingTransactions.length} `}
            <Anchor onClick={() => navigate(`/transactions/${blockCount}`)}>See Transactions...</Anchor>
          </Text>

          <Select
            label="From Address"
            data={_wallets.map(w => ({ label: w.name, value: w.keys.public }))}
            value={minerAddress} onChange={setMinerAddress}
            withinPortal={true}
          />

          <Button onClick={mine}>Mine</Button>

        </Flex>
      </Card>
    </>
  )
}