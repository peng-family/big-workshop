import { Account } from "../../account";
import { Attribute, ERC721Metadata, Item, ItemClass } from "../Item";
import { TotemContract } from "./TotemContract";
import { Tribes } from "./tribes";

export class Totem extends Item<ItemClass.KEY> {
  private _contract: TotemContract;
  private _metadataUri: string | null = null;
  private _metadata: ERC721Metadata | null = null;
  public isLoaded: boolean = false;
  public id: number;

  constructor(id: number, contract: TotemContract) {
    super(ItemClass.KEY);
    this.id = id;
    this._contract = contract;
  }

  public initialize = async () => {
    this._metadataUri = await this._contract.tokenUri(this.id);
    this._metadata = await TotemContract.getMetadata(this._metadataUri);
    this.isLoaded = true;
    return this;
  };

  public get type(): Tribes {
    if (this._metadata?.name.toLowerCase().indexOf(Tribes.VOLCANO) !== -1) {
      return Tribes.VOLCANO;
    } else if (this._metadata?.name.toLowerCase().indexOf(Tribes.ICE) !== -1) {
      return Tribes.ICE;
    } else if (
      this._metadata?.name.toLowerCase().indexOf(Tribes.JUNGLE) !== -1
    ) {
      return Tribes.JUNGLE;
    } else if (
      this._metadata?.name.toLowerCase().indexOf(Tribes.STORM) !== -1
    ) {
      return Tribes.STORM;
    } else {
      throw new Error("The type of your totem is not recognized");
    }
  }

  public get description(): string {
    if (this._metadata) {
      return this._metadata.description;
    } else {
      throw new Error(
        "Metadata are not loaded. An error happened during the initialization"
      );
    }
  }
  public get image(): string {
    if (this._metadata) {
      return this._metadata.image;
    } else {
      throw new Error(
        "Metadata are not loaded. An error happened during the initialization"
      );
    }
  }
  public get animation_url(): string {
    if (this._metadata) {
      return this._metadata.animation_url;
    } else {
      throw new Error(
        "Metadata are not loaded. An error happened during the initialization"
      );
    }
  }
  public get attributes(): Attribute[] {
    if (this._metadata) {
      return this._metadata.attributes;
    } else {
      throw new Error(
        "Metadata are not loaded. An error happened during the initialization"
      );
    }
  }
  public get name(): string {
    if (this._metadata) {
      return this._metadata.name;
    } else {
      throw new Error(
        "Metadata are not loaded. An error happened during the initialization"
      );
    }
  }

  public get metadata(): ERC721Metadata {
    if (this._metadata) {
      return this._metadata;
    } else {
      throw new Error(
        "Metadata are not loaded. An error happened during the initialization"
      );
    }
  }
}
