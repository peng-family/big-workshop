import { TotemContract } from "./totem/TotemContract";

export enum ItemClass {
  KEY = "key",
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface ERC721Metadata {
  description: string;
  image: string;
  animation_url: string;
  attributes: Attribute[];
  name: string;
}

export abstract class Item<ItemClass> {
  public class: ItemClass | null;

  constructor(type: ItemClass) {
    this.class = type;
  }

  abstract get description(): string;
  abstract get image(): string;
  abstract get animation_url(): string;
  abstract get attributes(): Attribute[];
  abstract get name(): string;
}
