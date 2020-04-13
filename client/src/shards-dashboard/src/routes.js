import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";

export default [
  {
    path: "/shards-admin/",
    layout: DefaultLayout,
    component: BlogOverview
  }
];
