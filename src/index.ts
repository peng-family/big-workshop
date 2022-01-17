/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { initializeApp } from "./application";
import { createMyPengsTab, createPengdexTab } from "./application/menu";
import { Account } from "./models/account";
import { LayerManager } from "./models/layerManager";
import { PenguinContract } from "./models/penguinContract/penguinContract";
import { Player } from "./models/player";

let layerManager: LayerManager;
let account: Account;
let penguinContract: PenguinContract;
let player: Player;
console.log(window);

//@ts-ignore
if (window.ethereum) {
  const initialization = async () => {
    const appVars = await initializeApp();
    penguinContract = appVars.penguinContract;
    player = appVars.player;
    account = appVars.account;
  };

  const initializeMenu = async () => {
    const totalSupply = await penguinContract.totalSupply();
    createMyPengsTab(account.address);
    createPengdexTab(totalSupply);
  };

  const initializeLayers = async () => {
    layerManager = new LayerManager(player);
  };

  initialization().then(initializeMenu).then(initializeLayers);
}
