import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
// Bootstrap CSS, subject to removal
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS, subject to removal 2.
import "bootstrap/dist/js/bootstrap.bundle.min";
// Allows application of defined charka styles & themes
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
// Added to make dark the default theme
import theme from "./config/theme.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
