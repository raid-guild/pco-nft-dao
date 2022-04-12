import "./index.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WalletProvider } from "contexts/WalletContext";
import React from "react";
import ReactDOM from "react-dom";
import { NETWORKS } from "web3/constants";

import App from "./App";

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/ian-bright/pco_nft_rinkeby",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <WalletProvider
        networks={NETWORKS}
        web3modalOptions={{ cacheProvider: true, theme: "dark" }}
      >
        <App />
      </WalletProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
