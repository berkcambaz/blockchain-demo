import { useAppStore } from "@/stores/appStore";
import { ActionIcon, Card, createStyles, Flex, Image, px, Title } from "@mantine/core";
import { Icon3dCubeSphere, IconArrowLeft, IconMobiledata, IconWallet } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    width: "100%",
    maxWidth: theme.breakpoints.sm,
    height: 64,
    zIndex: 100,

    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      borderRadius: 0,
    },
  },

  main: {
    marginTop: px(theme.spacing.md) + 64,
    marginBottom: px(theme.spacing.md) + 64,
  },

  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxWidth: theme.breakpoints.sm,
    height: 64,
    zIndex: 100,

    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      borderRadius: 0,
    },
  },
}));

export default function DefaultLayout() {
  const { classes } = useStyles();

  const route = useAppStore(state => state.route);
  const navigate = useNavigate();

  return (
    <Flex direction="column">

      <Card withBorder className={classes.header}>
        <Flex justify="space-between">
          <ActionIcon
            size={32}
            color="dark"
            onClick={() => navigate(-1)}
            sx={route === "blockchain" ? { visibility: "hidden" } : undefined}>
            <IconArrowLeft size={32} />
          </ActionIcon>

          <Flex direction="row" justify="center" gap="md">
            <Image src="/favicon.svg" width={36} height={36} />
            <Title order={2}>DorByte Chain</Title>
          </Flex>

          {/* Added just to make logo centered (because of justify space-between) */}
          <ActionIcon size={32} sx={{ visibility: "hidden" }}>
            <IconArrowLeft size={32} />
          </ActionIcon>
        </Flex>
      </Card>

      <Flex direction="column" gap="md" px="md" className={classes.main}>
        <Outlet />
      </Flex>

      <Card withBorder className={classes.footer}>
        <Flex direction="row" align="center" justify="center" gap="md">

          <ActionIcon
            color={route === "blockchain" ? "green" : undefined}
            onClick={() => navigate("/blockchain")}
            size={32}
          >
            <Icon3dCubeSphere size={32} />
          </ActionIcon>

          <ActionIcon
            color={route === "transactions" ? "green" : undefined}
            onClick={() => navigate("/transactions")}
            size={32}
          >
            <IconMobiledata size={32} />
          </ActionIcon>

          <ActionIcon
            color={route === "wallets" ? "green" : undefined}
            onClick={() => navigate("/wallets")}
            size={32}
          >
            <IconWallet size={32} />
          </ActionIcon>

        </Flex>
      </Card>

    </Flex>
  )
}