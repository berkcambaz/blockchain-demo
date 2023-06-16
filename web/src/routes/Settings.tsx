import { useCryptoStore } from "@/stores/cryptoStore";
import { Button, Card, Flex } from "@mantine/core";

export default function Settings() {
  const reset = () => {
    useCryptoStore.getState().reset();
  }

  return (
    <>
      <Card withBorder>
        <Flex direction="column" gap="xs">
          <Button onClick={reset}>Reset Blockchain</Button>
        </Flex>
      </Card>
    </>
  )
}