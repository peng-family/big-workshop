import { Attribute, ERC721Metadata } from "../items/Item";
import { PenguinContract } from "./penguinContract/penguinContract";

export class Penguin {
  private _penguinContract: PenguinContract;
  private _metadataUri: string | null = null;
  private _metadata: ERC721Metadata | null = null;
  public isLoaded: boolean = false;
  public id: number;

  constructor(id: number, contract: PenguinContract) {
    this._penguinContract = contract;    
    this.id = id;
  }

  public initialize = async () => {
    this._metadataUri = await this._penguinContract.tokenUri(this.id);
    this._metadata = await PenguinContract.getMetadata(this._metadataUri);
    this.isLoaded = true;
    return this;
  };

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
