import Web3 from "web3";

import { Contract } from "web3-eth-contract";
import { avaxPenguin } from "./PengFam";
import { contracts } from "./../network/networks";
import { Account } from "../account";

export class PenguinContract {
  private _web3: Web3;
  private _penguinERC720Contract: Contract;
  private _account: Account;

  constructor(web3Instance: Web3, account: Account) {
    const { pengContract } = contracts();

    this._web3 = web3Instance;
    this._account = account;
    //@ts-ignore
    const ETHEREUM = window.ethereum;
    const web3 = new Web3(ETHEREUM);
    this._penguinERC720Contract = new web3.eth.Contract(
      avaxPenguin.abi as any,
      pengContract
    );
  }

  public totalSupply = async () => {
    return this._penguinERC720Contract.methods
      .totalSupply()
      .call()
      .catch((err: any) =>
        console.error("An error occured during the load of total supply.", err)
      );
  };

  public tokensByAddress = async (): Promise<number[]> => {
    return this._penguinERC720Contract.methods
      .tokensByAddress(this._account.address)
      .call()
      .then((nftIds: string[]) => nftIds.map((nftId) => Number(nftId)))
      .catch((err: any) =>
        console.error("An error occured during the load your nfts.", err)
      );
  };
}
