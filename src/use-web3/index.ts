import { Contract } from "web3-eth-contract";
import Web3 from "web3";

import bbuxContractArtifacts from "./contracts/PengFam.json";

//@ts-ignore
const ETHEREUM = window.ethereum;
const PENG_FAM_CONTRACT = "0x84218C9DBce1f453eDde52A69C7cE702fe62dFB8";

export const useWeb3 = () => {
  const web3 = new Web3(ETHEREUM);
  if (ETHEREUM) {
    ETHEREUM.enable();
  }
  const pengFamilyContractERC720 = new web3.eth.Contract(
    bbuxContractArtifacts.abi as any,
    PENG_FAM_CONTRACT
  );
  return { web3, pengFamilyContractERC720 };
};
