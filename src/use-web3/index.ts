import { useCallback, useEffect, useState } from "react";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";

import bbuxContractArtifacts from "./contracts/BBU.json";

//@ts-ignore
const ETHEREUM = window.ethereum;
const BBU_CONTRACT_ADDRESS = "0x9b2B8d596191d5c42C60794852CE65082b5aF261";

export const useWeb3 = () => {
  let web3: Web3;
  let BBUContract: Contract;

  web3 = new Web3(ETHEREUM);
  if (ETHEREUM) {
    ETHEREUM.enable();
  }
  const bbuxContractCreated = new web3.eth.Contract(
    bbuxContractArtifacts.abi as any,
    BBU_CONTRACT_ADDRESS
  );

  console.log("heyhey", web3);
};
