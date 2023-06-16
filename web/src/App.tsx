import { blockchain, IBlockchain } from "@core/blockchain";
import { transaction } from "@core/transaction";
import { wallet } from "@core/wallet";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { IAppWallet } from "./components/types/wallet";
import { useAppStore } from "./stores/appStore";
import { useCryptoStore } from "./stores/cryptoStore";
import { theme } from "./styles/theme";

export default function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.indexOf("/blockchain") !== -1) useAppStore.setState(s => { s.route = "blockchain" });
    else if (location.pathname.indexOf("/transactions") !== -1) useAppStore.setState(s => { s.route = "transactions" });
    else if (location.pathname.indexOf("/wallets") !== -1) useAppStore.setState(s => { s.route = "wallets" });
    else if (location.pathname.indexOf("/settings") !== -1) useAppStore.setState(s => { s.route = "settings" });
    else useAppStore.setState(s => { s.route = "any" });
  }, [location.pathname]);

  const ready = useCryptoStore(state => state.ready);
  useEffect(() => {
    if (ready) return;

    (async () => {
      const _blockchain: IBlockchain = blockchain.create(2, 100);

      const miner = wallet.create();
      const man = wallet.create();
      const woman = wallet.create();
      const _wallets: IAppWallet[] = [
        { name: "Miner", keys: miner },
        { name: "Man", keys: man },
        { name: "Woman", keys: woman },
      ];

      await blockchain.minePendingTransactions(_blockchain, miner.public);

      const tx1 = transaction.create(miner.public, man.public, 25);
      transaction.sign(tx1, miner.private);
      blockchain.addTransaction(_blockchain, tx1);

      const tx2 = transaction.create(miner.public, woman.public, 25);
      transaction.sign(tx2, miner.private);
      blockchain.addTransaction(_blockchain, tx2);

      await blockchain.minePendingTransactions(_blockchain, miner.public);

      useCryptoStore.setState(s => {
        s.blockchain = _blockchain;
        s.wallets = _wallets;
        s.ready = true;
      });
    })();
  }, [ready]);

  return (
    <>
      <MantineProvider theme={{ ...theme }} withNormalizeCSS withGlobalStyles>
        <Outlet />
      </MantineProvider>

      <ScrollRestoration />
    </>
  )
}