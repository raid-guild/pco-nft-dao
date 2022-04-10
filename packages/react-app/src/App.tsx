import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { abis, addresses } from "@my-app/contracts";
import {
  // shortenAddress,
  useCall,
  // useEthers,
  // useLookupAddress,
} from "@usedapp/core";
// import React, { useEffect, useState } from "react";
import { useEffect } from "react";
import Game from "views/Game";

// import { Body, Button, Container, Header, Image, Link } from "./components";
// import logo from "./ethereumLogo.png";
import GET_TRANSFERS from "./graphql/subgraph";

// function WalletButton() {
//   const [rendered, setRendered] = useState("");

//   const ens = useLookupAddress();
//   const { account, activateBrowserWallet, deactivate, error } = useEthers();

//   useEffect(() => {
//     if (ens) {
//       setRendered(ens);
//     } else if (account) {
//       setRendered(shortenAddress(account));
//     } else {
//       setRendered("");
//     }
//   }, [account, ens, setRendered]);

//   useEffect(() => {
//     if (error) {
//       console.error("Error while connecting wallet:", error.message);
//     }
//   }, [error]);

//   return (
//     <Button
//       onClick={() => {
//         if (!account) {
//           activateBrowserWallet();
//         } else {
//           deactivate();
//         }
//       }}
//     >
//       {rendered === "" && "Connect Wallet"}
//       {rendered !== "" && rendered}
//     </Button>
//   );
// }

function App(): JSX.Element {
  // Read more about useDapp on https://usedapp.io/
  // eslint-disable-next-line
  const { error: contractCallError, value: tokenBalance } =
    useCall({
      contract: new Contract(addresses.ceaErc20, abis.erc20),
      method: "balanceOf",
      args: ["0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"],
    }) ?? {};

  const { loading, error: subgraphQueryError, data } = useQuery(GET_TRANSFERS);

  useEffect(() => {
    if (subgraphQueryError) {
      console.error(
        "Error while querying subgraph:",
        subgraphQueryError.message,
      );
      return;
    }
    if (!loading && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, subgraphQueryError, data]);

  return <Game />;
}

export default App;
