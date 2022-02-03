import Web3 from "web3";
import { PenguinContract } from "../penguin/penguinContract/penguinContract";
import { Penguin } from "../penguin";
import { Tribes } from "../items/totem/tribes";
import { Account } from "../account";
import { TotemContract } from "../items/totem/totem_contract/TotemContract";
import { Inventory } from "../inventory/inventory";
import { Totem } from "../items/totem/Totem";

let simpleWeb3: Web3;

export class Player {
  private _penguinContract: PenguinContract;
  private _totemContract: TotemContract;
  private _penguins: Penguin[] = [];
  private _account: Account;
  private _inventory: Inventory | null = null;

  constructor(
    penguinContract: PenguinContract,
    totemContract: TotemContract,
    account: Account
  ) {
    this._penguinContract = penguinContract;
    this._totemContract = totemContract;
    this._account = account;
  }

  public initialize = async () => {
    this._penguins = await this._penguinContract
      .tokensByAddress()
      .then((tokenIds) =>
        tokenIds.map((tokenId) => {
          const _peng = new Penguin(tokenId, this._penguinContract);
          _peng.initialize();
          return _peng;
        })
      );
    this._inventory = new Inventory(this._totemContract);
    await this._inventory.initialize();
  };

  public get inventory(): Inventory {
    if (this._inventory) {
      return this._inventory;
    } else {
      throw new Error("Inventory not initialized. An error should occured");
    }
  }

  public get tribes(): Set<Tribes> {
    const tribes = new Set<Tribes>();
    this.inventory.keyItems.forEach((item) => {
      if (item instanceof Totem) {
        tribes.add(item.type);
      }
    });
    return tribes;
  }

  public get penguins(): Penguin[] {
    return this._penguins;
  }
}
