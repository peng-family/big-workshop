import { useWeb3 } from "../web3/index";
import { Account } from "../models/account";
import { PenguinContract } from "../models/penguin/penguinContract/penguinContract";
import { Player } from "../models/player";
import { TotemContract } from "../models/items/totem/totem_contract/TotemContract";
import { AuthService } from "../models/auth/auth";
import { getAuth } from "@firebase/auth";
import { initFirebase } from "../models/auth/initFirebase";

export const initializeApp = async () => {
  const web3 = await useWeb3();
  if (web3) {
    const { app } = initFirebase();
    const auth = getAuth();
    const authService = new AuthService(web3, auth);
    await authService.signInWithMetaMask();
    const account = new Account(web3, authService);
    await account.initializeAccount();
    const penguinContract = new PenguinContract(web3, account);
    const totemContract = new TotemContract(web3, account);
    const player = new Player(penguinContract, totemContract, account);
    await player.initialize();
    window.pengFam = { player };
    return { player, penguinContract, account };
  }
  return null;
};

declare global {
  interface Window {
    pengFam: {
      player: Player;
    };
  }
}
