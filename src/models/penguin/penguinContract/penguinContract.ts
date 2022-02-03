import Web3 from "web3";

import { Contract } from "web3-eth-contract";
import { avaxPenguin } from "./PengFam";
import { contracts } from "../../network/networks";
import { Account } from "../../account";
import axios, { AxiosResponse } from "axios";
import { ERC721Metadata } from "../../items/Item";

export class PenguinContract {
  private _penguinContract: Contract;
  private _account: Account;

  constructor(web3: Web3, account: Account) {
    const { pengContract } = contracts();
    this._account = account;
    this._penguinContract = new web3.eth.Contract(
      avaxPenguin.abi as any,
      pengContract
    );
    // this._penguinContract.
    // console.log(
    //   Web3.utils.hexToAscii(
    //     "0x51ed82880000000000000000000000000000000000000000000000000000000000015790"
    //   )
    // );
  }

  public totalSupply = async () => {
    return this._penguinContract.methods
      .totalSupply()
      .call()
      .catch((err: any) =>
        console.error("An error occured during the load of total supply.", err)
      );
  };

  public tokenUri = async (nftId: number): Promise<string> => {
    const _uriTmp = await this._penguinContract.methods.tokenURI(nftId).call();
    const tmpUrl = _uriTmp.substring("ipfs://".length);
    return "https://ipfs.io/ipfs/".concat(tmpUrl);
  };

  public tokensByAddress = async (): Promise<number[]> => {
    return this._penguinContract.methods
      .tokensByAddress(this._account.address)
      .call()
      .then((nftIds: string[]) => nftIds.map((nftId) => Number(nftId)))
      .catch((err: any) =>
        console.error("An error occured during the load your nfts.", err)
      );
  };

  public static getMetadata = async (uri: string): Promise<ERC721Metadata> => {
    return (await axios.get<null, AxiosResponse<ERC721Metadata>>(uri)).data;
  };
}
