// import Web3 from "web3";

// import bbuxContractArtifacts from "./contracts/PengFam.json";

//@ts-ignore
const ETHEREUM = window.ethereum;
// const PENG_FAM_CONTRACT = "0x393b4e7cDD7aA4B406f4e97876b3A84fAF04D6d8";
const PENG_FAM_CONTRACT = "0x96f020b13f1b8b46d70723c3a3c7b4cc6618e99e";
// la toute derniere pour fuji 0x393b4e7cDD7aA4B406f4e97876b3A84fAF04D6d8
const useWeb3 = () => {
  const web3 = new Web3(ETHEREUM);
  if (ETHEREUM) {
    ETHEREUM.enable();
  }

  const pengFamilyContractERC720 = new web3.eth.Contract(
    avaxPenguin.abi,
    PENG_FAM_CONTRACT
  );
  return { web3, pengFamilyContractERC720 };
};
