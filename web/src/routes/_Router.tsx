import React, { Suspense } from "react";
import { createHashRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App";
import CenterLoader from "@/components/loaders/CenterLoader";
import { useWait } from "../components/hooks";

// Lazy routes \\
const LazyHome = React.lazy(useWait(() => import("./Home")));
const LazyNotFound = React.lazy(useWait(() => import("./NotFound")));
// Lazy routes \\

const Home = <Suspense fallback={<CenterLoader />}><LazyHome /></Suspense>
const NotFound = <Suspense fallback={<CenterLoader />}><LazyNotFound /></Suspense>

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Navigate to "/home" on path "/" */}
      <Route index element={<Navigate to="/home" />} />

      <Route path="/home" element={Home} />

      {/* Error routes & catch all */}
      <Route path="/404" element={NotFound} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  )
)
