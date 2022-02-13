/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { initializeApp } from "./application";
import {
  createMyPengsTab,
  createPengdexTab,
  createMyInventoryTab,
} from "./application/menu";
import { initializeBetaQuest } from "./application/beta-quest/betaQuest";
import { initializeBoardsEnv } from "./application/environment/boardsProcessor";
import { Account } from "./models/account";
import { AudioPlayer, MUSICS } from "./models/audioPlayer";
import { LayerManager } from "./models/layerManager";
import { PenguinContract } from "./models/penguin/penguinContract/penguinContract";
import { Player } from "./models/player";

let layerManager: LayerManager;
let account: Account;
let penguinContract: PenguinContract;
let player: Player;
let musicPlayer: AudioPlayer;
console.log(window);

//@ts-ignore
if (window.ethereum) {
  const initialization = async () => {
    try {
      const appVars = await initializeApp();
      if (appVars) {
        penguinContract = appVars.penguinContract;
        player = appVars.player;
        account = appVars.account;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initializeMenu = async () => {
    try {
      const totalSupply = await penguinContract.totalSupply();
      createMyPengsTab(account.address);
      createPengdexTab(totalSupply);
      createMyInventoryTab();
    } catch (error) {
      console.log(error);
    }
    initializeBetaQuest();
    initializeBoardsEnv();
    // console.log(player);
    // console.log(player.inventory);
  };

  const initializeLayers = async () => {
    try {
      layerManager = new LayerManager(player);
    } catch (err) {
      console.error(err);
    }
  };

  initialization().then(initializeMenu).then(initializeLayers);
}
