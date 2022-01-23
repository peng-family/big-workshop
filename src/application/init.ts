import { useWeb3 } from "../web3/index";
import { Account } from "../models/account";
import { PenguinContract } from "../models/penguinContract/penguinContract";
import { Player } from "../models/player";
import { TotemContract } from "../models/items/totem/TotemContract";

export const initializeApp = async () => {
  const { web3, pengFamilyContractERC720 } = useWeb3();
  const account = new Account(web3);
  await account.initializeAccount();

  const penguinContract = new PenguinContract(
    web3,
    account,
    pengFamilyContractERC720
  );

  const totemContract = new TotemContract(account);
  const player = new Player(penguinContract, totemContract, account);
  await player.initialize();
  return { player, penguinContract, account };
};
