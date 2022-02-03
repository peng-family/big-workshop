import { Item, ItemClass } from "../items/Item";
import { Totem } from "../items/totem/Totem";
import { TotemContract } from "../items/totem/totem_contract/TotemContract";

export class Inventory {
  public keyItems: Item<ItemClass.KEY>[] = [];
  private _totemContract: TotemContract;

  constructor(totemContract: TotemContract) {
    this._totemContract = totemContract;
  }

  public initialize = async () => {
    await this.initializeTotems();
  };

  private initializeTotems = async () => {
    const nftIds = await this._totemContract.tokensByAddress();
    const totemLoading: Promise<Totem>[] = [];
    nftIds.forEach(async (nftId) => {
      const _totem = new Totem(nftId, this._totemContract);
      totemLoading.push(_totem.initialize());
    });
    const totems = await Promise.all(totemLoading);
    this.keyItems = [...this.keyItems, ...totems];
  };
}
