import Web3 from "web3";

import { Contract } from "web3-eth-contract";
import { Account } from "../account";

export class PenguinContract {
  private _web3: Web3;
  private _penguinERC720Contract: Contract;
  private _account: Account;

  constructor(
    web3Instance: Web3,
    account: Account,
    penguinERC720Contract: Contract
  ) {
    this._web3 = web3Instance;
    this._account = account;
    this._penguinERC720Contract = penguinERC720Contract;
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
