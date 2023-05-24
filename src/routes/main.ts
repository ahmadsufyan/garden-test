import React from "react";
import { Route } from "@type/route";

export const mainRoutes:Route[] = [
  {
    path: "/",
    element: React.lazy(() => import("@pages/main")),
  },
  {
    path: "/:priceId/detail",
    element: React.lazy(() => import("@pages/detail")),
  },
];
