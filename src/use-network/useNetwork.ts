import { useEffect, useState } from "react";
import Web3 from "web3";
import {
  AVALANCHE_MAINNET_PARAMS,
  AVALANCHE_TESTNET_PARAMS,
} from "../types/avalanche-network";

export const useNetwork = (
  web3: Web3 | null
): [
  isConnectedToWrongNetwork: boolean,
  setIsConnectedToWrongNetwork: typeof setIsConnectedToWrongNetwork
] => {
  const [isConnectedToWrongNetwork, setIsConnectedToWrongNetwork] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (web3) {
        const chainId = await web3.eth.getChainId();
        const chainIdHexa = `0x${chainId.toString(16)}`;
        if (
          chainIdHexa !== AVALANCHE_MAINNET_PARAMS.chainId &&
          chainIdHexa !== AVALANCHE_TESTNET_PARAMS.chainId
        ) {
          setIsConnectedToWrongNetwork(true);
        } else if (chainIdHexa === AVALANCHE_MAINNET_PARAMS.chainId) {
          // TO be deleted - we are not supporting Avalanche mainNet for now
          setIsConnectedToWrongNetwork(true);
        }
      }
    })();
  }, [web3]);

  return [isConnectedToWrongNetwork, setIsConnectedToWrongNetwork];
};
