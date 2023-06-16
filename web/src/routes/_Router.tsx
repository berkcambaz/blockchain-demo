import React, { Suspense } from "react";
import { createHashRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App";
import CenterLoader from "@/components/loaders/CenterLoader";
import { useWait } from "../components/hooks";
import DefaultLayout from "@/components/layouts/DefaultLayout";

// Lazy routes \\
const LazyBlockchain = React.lazy(useWait(() => import("./Blockchain")));
const LazyTransactions = React.lazy(useWait(() => import("./Transactions")));
const LazyWallets = React.lazy(useWait(() => import("./Wallets")));
const LazyNotFound = React.lazy(useWait(() => import("./NotFound")));
// Lazy routes \\

const Blockchain = <Suspense fallback={<CenterLoader />}><LazyBlockchain /></Suspense>
const Transactions = <Suspense fallback={<CenterLoader />}><LazyTransactions /></Suspense>
const Wallets = <Suspense fallback={<CenterLoader />}><LazyWallets /></Suspense>
const NotFound = <Suspense fallback={<CenterLoader />}><LazyNotFound /></Suspense>

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Navigate to "/blockchain" on path "/" */}
      <Route index element={<Navigate to="/blockchain" />} />

      <Route element={<Suspense fallback={<CenterLoader />}><DefaultLayout /></Suspense>}>
        <Route path="/blockchain" element={Blockchain} />
        <Route path="/transactions" element={Transactions} />
        <Route path="/wallets" element={Wallets} />

        {/* Error routes & catch all */}
        <Route path="/404" element={NotFound} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Route>
  )
)
