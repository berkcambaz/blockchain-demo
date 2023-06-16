import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { useAppStore } from "./stores/appStore";
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

  return (
    <>
      <MantineProvider theme={{ ...theme }} withNormalizeCSS withGlobalStyles>
        <Outlet />
      </MantineProvider>

      <ScrollRestoration />
    </>
  )
}