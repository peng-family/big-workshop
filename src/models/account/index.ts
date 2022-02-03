import BigNumber from "bignumber.js";
import Web3 from "web3";
import { AuthService } from "../auth/auth";

export class Account {
  private _address: string | null = null;
  constructor(private _web3: Web3, private _authService: AuthService) {}

  public initializeAccount = async () => {
    if (!this._address) {
      return await this._web3.eth.getAccounts().then((accounts) => {
        this._address = accounts[0];
        return accounts[0];
      });
    } else {
      throw new Error("Account already initialized");
    }
  };

  public getBalance = async () => {
    return await this._web3.eth
      .getBalance(this.address)
      .then((result) =>
        new BigNumber(result).dividedBy(1000000000000000000).toString()
      );
  };

  public get address(): string {
    if (this._address) {
      return this._address;
    } else {
      throw new Error(
        "Account not initialized, please use initializeAccount() method before"
      );
    }
  }
}
