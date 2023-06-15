import { wrapContent } from "@/styles/css";
import { Card, Flex, Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <Flex direction="column" align="center" gap="md" p="md">
      <Card>
        <Title order={4}>Test wallet 1</Title>

        <Text sx={wrapContent}>
          Public key: <br />
          046fd9b5b1492f5708bd6ed77641940e29df0a432fa63b6af546fec3055394af36b8b84b056c3f0bd52b48142523ffabf988716a723dc9d78f1fecd9fe96d769f5
        </Text>

        <Text sx={wrapContent}>
          Private key: <br />
          a9679280ee798da282d58b316400b03ad650727f770a0921a7f0fdac2809a5fe
        </Text>
      </Card>

      <Card>
        <Title order={4}>Test wallet 2</Title>

        <Text sx={wrapContent}>
          Public key: <br />
          04dc130e7f99b39c605d031ba20a5f6a6c426315591bd1f73a197c01ad24f33ea27e7f6ae3001023fc89a257b2ca9d5b768b24b87fa3d5f9f9cac1d476eaed0450
        </Text>

        <Text sx={wrapContent}>
          Private key: <br />
          24d94ddd3fc2dd0f7279d1dba8c4e0f6def17bfa7bccc25d87e3ac1c30bdfffd
        </Text>
      </Card>
    </Flex>
  )
}