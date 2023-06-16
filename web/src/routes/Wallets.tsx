import Wallet from "@/components/blockchain/Wallet";
import { IAppWallet } from "@/components/types/wallet";
import { useCryptoStore } from "@/stores/cryptoStore";
import { wallet } from "@core/wallet";
import { Button, Card, Flex, TextInput } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function WalletRoute() {
  const params = useParams<{ id: string }>();

  const _wallets = useCryptoStore(state => state.wallets);
  const [walletName, setWalletName] = useState("");

  const createWallet = () => {
    const name = walletName.trim();
    if (!name) return;

    const w: IAppWallet = { name, keys: wallet.create() };
    useCryptoStore.setState(s => { s.wallets.push(w) });

    setWalletName("");
  }

  return (
    <>
      {params.id === undefined &&
        <>
          <Card withBorder>
            <Flex direction="column" gap="xs">

              <TextInput
                label="Wallet Name"
                placeholder="Enter a wallet name..."
                value={walletName}
                onChange={(event) => setWalletName(event.currentTarget.value)}
              />
              <Button onClick={createWallet}>Create Wallet</Button>

            </Flex>
          </Card>

          {_wallets.map((w) => <Wallet wallet={w} key={w.keys.public} />)}
        </>
      }

      {params.id !== undefined &&
        <>
        </>
      }
    </>
  )
}