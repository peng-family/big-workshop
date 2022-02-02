import { Contract } from "web3-eth-contract";
import Web3 from "web3";

// import { avaxPenguin } from "../models/penguinContract/PengFam";

//@ts-ignore
const ETHEREUM = window.ethereum;
// Fuji
// const PENG_FAM_CONTRACT = "0x393b4e7cDD7aA4B406f4e97876b3A84fAF04D6d8";
// const PENG_TOTEMS_CONTRACT = "0x165F4EF81F3e055ffDE90c0bd51Fc26b7798a164";
// Prod
// const PENG_FAM_CONTRACT = "0x96f020b13f1b8b46d70723c3a3c7b4cc6618e99e";

export const useWeb3 = () => {
  const web3 = new Web3(ETHEREUM);
  if (ETHEREUM) {
    ETHEREUM.enable();
  }

  // const pengFamilyContractERC720 = new web3.eth.Contract(
  //   avaxPenguin.abi as any,
  //   PENG_FAM_CONTRACT
  // );

  return { web3 };
};
