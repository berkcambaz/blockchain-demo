import { wrapContent } from "@/styles/css";
import { Anchor, Card, Flex, Text, Title } from "@mantine/core";
import { IAppWallet } from "../types/wallet";

export default function Wallet({ wallet, balance }: { wallet: IAppWallet, balance: number }) {
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

        <Text truncate>{`Balance: ${balance}`}</Text>

      </Flex>
    </Card>
  )
}