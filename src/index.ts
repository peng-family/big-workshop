/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { initializeApp } from "./application";
import { createMyPengsTab, createPengdexTab } from "./application/menu";
import { Account } from "./models/account";
import { AudioPlayer, MUSICS } from "./models/audioPlayer";
import { LayerManager } from "./models/layerManager";
import { PenguinContract } from "./models/penguinContract/penguinContract";
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
    const appVars = await initializeApp();
    penguinContract = appVars.penguinContract;
    player = appVars.player;
    account = appVars.account;
  };

  const initializeMenu = async () => {
    musicPlayer = new AudioPlayer();
    // musicPlayer.playMusic(MUSICS.MOMMY_BUY_ME_PENG);
    musicPlayer.playMusic(MUSICS.WALLET_FOR_2);
    console.log("playe music");
    const totalSupply = await penguinContract.totalSupply();
    createMyPengsTab(account.address);
    createPengdexTab(totalSupply);
    console.log(player);
    console.log(player.inventory);
  };

  const initializeLayers = async () => {
    layerManager = new LayerManager(player);
    console.log("layer manager initialized", player.tribes.size);
  };

  initialization().then(initializeMenu).then(initializeLayers);
}
