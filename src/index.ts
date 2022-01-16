/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { initializeApp } from "./application";
import { Account } from "./models/account";
import { LayerManager } from "./models/layerManager";
import { PenguinContract } from "./models/penguinContract/penguinContract";
import { Player } from "./models/player";

let layerManager: LayerManager;
let account: Account;
let penguinContract: PenguinContract;
let player: Player;
const WA = window.WA;

const initialization = async () => {
  const appVars = await initializeApp();
  penguinContract = appVars.penguinContract;
  player = appVars.player;
  account = appVars.account;
};

const initializeMenu = async () => {
  WA.ui.registerMenuCommand("My peng team", {
    iframe: `src/iframes/my-nft-collection/myNftCollection.html?accounAddress=${account.address}`,
    allowApi: true,
  });
  const totalSupply = await penguinContract.totalSupply();
  WA.ui.registerMenuCommand("Pengdex", {
    iframe: `src/iframes/collection/collection.html?totalSupply=${totalSupply}`,
    allowApi: true,
  });
};

const initializeLayers = async () => {
  layerManager = new LayerManager(player);
};

initialization().then(initializeMenu).then(initializeLayers);