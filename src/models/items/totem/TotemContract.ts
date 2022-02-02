import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import axios, { AxiosResponse } from "axios";

import { Account } from "../../account";
import { ERC721Metadata } from "../Item";
import { pengTotemAbi } from "./pengTotemsAbi";
import { contracts } from "../../network/networks";

export class TotemContract {
  private _totemContract: Contract;
  private _account: Account;

  constructor(account: Account) {
    const { totemContract } = contracts();
    //@ts-ignore
    const ETHEREUM = window.ethereum;
    const web3 = new Web3(ETHEREUM);
    const totemsContract = new web3.eth.Contract(
      pengTotemAbi as any,
      totemContract
    );
    this._totemContract = totemsContract;
    this._account = account;
  }

  public totalSupply = async () => {
    return this._totemContract.methods
      .totalSupply()
      .call()
      .catch((err: any) =>
        console.error("An error occured during the load of total supply.", err)
      );
  };

  public tokensByAddress = async (): Promise<number[]> => {
    return this._totemContract.methods
      .tokensByAddress(this._account.address)
      .call()
      .then((nftIds: string[]) => nftIds.map((nftId) => Number(nftId)))
      .catch((err: any) =>
        console.error("An error occured during the load your nfts.", err)
      );
  };

  public tokenUri = async (nftId: number): Promise<string> => {
    const _uriTmp = await this._totemContract.methods.tokenURI(nftId).call();
    const tmpUrl = _uriTmp.substring("ipfs://".length);
    return "https://ipfs.io/ipfs/".concat(tmpUrl);
  };

  public static getMetadata = async (uri: string): Promise<ERC721Metadata> => {
    return (await axios.get<null, AxiosResponse<ERC721Metadata>>(uri)).data;
  };
}
