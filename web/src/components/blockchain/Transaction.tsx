import { ITransaction } from "@core/transaction";
import { Anchor, Card, Flex, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Transaction({ transaction, index }: { transaction: ITransaction, index: number }) {
  const navigate = useNavigate();

  return (
    <Card withBorder>
      <Flex direction="column" gap="xs">

        <Title order={3}>{`Transaction ${index}`}</Title>
        <Text truncate>{`Timestamp: ${transaction.timestamp}`}</Text>

        <Text>
          <Text truncate>
            {"From: "}
            <Anchor onClick={() => navigate(`/wallets/${transaction.fromAddress}`)}>
              {transaction.fromAddress}
            </Anchor>
          </Text>

          <Text truncate>
            {"To: "}
            <Anchor onClick={() => navigate(`/wallets/${transaction.toAddress}`)}>
              {transaction.toAddress}
            </Anchor>
          </Text>

          <Text truncate>{`Amount: ${transaction.amount}`}</Text>
        </Text>

        <Text truncate>{`Signature: ${transaction.signature}`}</Text>

      </Flex>
    </Card>
  )
}