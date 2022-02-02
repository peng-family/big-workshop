import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const useWeb3 = async (): Promise<Web3 | null> => {
  const provider = await detectEthereumProvider();
  if (provider) {
    //@ts-ignore
    const chainId = await provider.request({
      method: "eth_chainId",
    });

    //@ts-ignore
    const web3 = new Web3(provider);
    return web3;
  }
  return null;
};
