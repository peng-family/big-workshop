import { useWeb3 } from "../web3/index";
import { Account } from "../models/account";
import { PenguinContract } from "../models/penguinContract/penguinContract";
import { Player } from "../models/player";
import { TotemContract } from "../models/items/totem/TotemContract";

export const initializeApp = async () => {
  const { web3 } = useWeb3();
  const account = new Account(web3);
  await account.initializeAccount();
  const penguinContract = new PenguinContract(web3, account);
  const totemContract = new TotemContract(account);
  const player = new Player(penguinContract, totemContract, account);
  await player.initialize();
  window.pengFam = { player };
  return { player, penguinContract, account };
};

declare global {
  interface Window {
    pengFam: {
      player: Player;
    };
  }
}
