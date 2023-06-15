import { useCryptoStore } from "@/stores/cryptoStore";
import { IBlock } from "@core/block";
import { ITransaction } from "@core/transaction";
import { ActionIcon, Anchor, Card, createStyles, Flex, Image, px, Text, Title } from "@mantine/core";
import { IconWallet, IconCe, IconMobiledata, IconCubeSend, Icon3dCubeSphere } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    margin: theme.spacing.md,
    zIndex: 100,
    width: `calc(100% - ${px(theme.spacing.md) * 2}px)`,
    maxWidth: theme.breakpoints.sm,
    height: 64,
  },

  main: {
    marginTop: px(theme.spacing.md) + 64,
    marginBottom: px(theme.spacing.md) + 64,
  },

  footer: {
    position: "fixed",
    bottom: 0,
    margin: theme.spacing.md,
    zIndex: 100,
    width: `calc(100% - ${px(theme.spacing.md) * 2}px)`,
    maxWidth: theme.breakpoints.sm,
    height: 64,
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const blockchain = useCryptoStore(state => state.blockchain);

  return (
    <Flex direction="column" gap="md">

      <Card withBorder className={classes.header}>
        <Flex direction="row" justify="center" gap="xs">
          <Image src="/favicon.svg" width={36} height={36} />
          <Title order={2}>DorByte Chain</Title>
        </Flex>
      </Card>

      <Flex direction="column" gap="md" p="md" className={classes.main}>
        {blockchain.chain.map((block, i) => <Block block={block} index={i} key={block.hash} />)}
      </Flex>

      <Card withBorder className={classes.footer}>
        <Flex direction="row" align="center" justify="center" gap="md">

          <ActionIcon size={32}>
            <Icon3dCubeSphere size={32} />
          </ActionIcon>

          <ActionIcon size={32}>
            <IconMobiledata size={32} />
          </ActionIcon>

          <ActionIcon size={32}>
            <IconWallet size={32} />
          </ActionIcon>

        </Flex>
      </Card>

    </Flex>
  )
}

function Block({ block, index }: { block: IBlock, index: number }) {
  return (
    <Card withBorder>
      <Flex direction="column" gap="xs">

        <Title order={3}>{`Block ${index}`}</Title>

        <Text truncate>{`Timestamp: ${block.timestamp}`}</Text>

        <Text truncate>Transactions: <Anchor >See Transactions...</Anchor></Text>

        <Flex direction="column">
          <Text truncate>{`Previous Hash: ${block.previousHash}`}</Text>
          <Text truncate>{`Hash: ${block.hash}`}</Text>
        </Flex>

        <Text truncate>{`Nonce: ${block.nonce}`}</Text>

      </Flex>
    </Card>
  )
}

function Transaction({ transaction }: { transaction: ITransaction }) {
  return (
    <></>
  )
}