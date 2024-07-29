import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,

  Link,
} from "react-router-dom";
import LoginPage from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<LoginPage/>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
