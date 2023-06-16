import { useCryptoStore } from "@/stores/cryptoStore";
import { wrapContent } from "@/styles/css";
import { blockchain } from "@core/blockchain";
import { Anchor, Card, Flex, Text, Title } from "@mantine/core";
import { IAppWallet } from "../types/wallet";

export default function Wallet({ wallet }: { wallet: IAppWallet }) {
  const _blockchain = useCryptoStore(state => state.blockchain);
  const balance = blockchain.getAddressBalance(_blockchain, wallet.keys.public);
  const pendingBalance = blockchain.getAddressPendingBalance(_blockchain, wallet.keys.public);

  return (
    <Card withBorder>
      <Flex direction="column" gap="xs">

        <Title order={3}>{wallet.name}</Title>

        <Text sx={wrapContent}>
          Public Key:<br />
          <Anchor>{wallet.keys.public}</Anchor>
        </Text>

        <Text sx={wrapContent}>
          Private Key:<br />
          <Anchor>{wallet.keys.private}</Anchor>
        </Text>

        <Text truncate>{`Balance: ${balance} (${pendingBalance * -1})`}</Text>

      </Flex>
    </Card>
  )
}