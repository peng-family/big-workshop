import { Item, ItemClass } from "../items/Item";
import { Totem } from "../items/totem/Totem";
import { TotemContract } from "../items/totem/TotemContract";

export class Inventory {
  public keyItem: Item<ItemClass.KEY>[] = [];
  private _totemContract: TotemContract;

  constructor(totemContract: TotemContract) {
    this._totemContract = totemContract;
    this.initialize();
  }

  private initialize = async () => {
    const nftIds = await this._totemContract.tokensByAddress();
    const totems = nftIds.map((nftId) => {
      return new Totem(nftId, this._totemContract);
    });
    this.keyItem = [...this.keyItem, ...totems];
  };
}
