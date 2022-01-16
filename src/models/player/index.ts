import Web3 from "web3";
import { PenguinContract } from "../penguinContract/penguinContract";
import { Penguin } from "../penguin";
import { Tribes } from "./tribes";
import { Account } from "../account";

let simpleWeb3: Web3;

export class Player {
  private _penguinContract: PenguinContract;
  private _tribes: Tribes[] = [];
  private _penguins: Penguin[] = [];
  private _account: Account;

  constructor(penguinContract: PenguinContract, account: Account) {
    this._penguinContract = penguinContract;
    this._account = account;
  }

  public initialize = async () => {
    this._penguins = await this._penguinContract
      .tokenByAddress()
      .then((tokenIds) => tokenIds.map((tokenId) => new Penguin(tokenId)));

    // todo: modifier ici pour vraiment target les tribes
    if (this._penguins.findIndex((peng) => peng.mintId === 3337) !== -1) {
      this._tribes.push(Tribes.VOLCANO);
    }
  };

  public get tribes(): Tribes[] {
    return this._tribes;
  }

  public get penguins(): Penguin[] {
    return this._penguins;
  }
}
