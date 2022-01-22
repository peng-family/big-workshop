import { Sound } from "@workadventure/iframe-api-typings/Api/iframe/Sound/Sound";
import sound from "../../assets/sound_effects/unlock_door.mp3";
import MommyBuyMeAPeng from "../../assets/music/Mommy.mp3";
import WalletFor2 from "../../assets/music/WalletFor2.mp3";

export enum MUSICS {
  MOMMY_BUY_ME_PENG = "Mommy",
  WALLET_FOR_2 = "WalletFor2",
}

const MusicDictionnary = {
  Mommy: MommyBuyMeAPeng,
  WalletFor2: WalletFor2,
};

const config = {
  volume: 0.5,
  loop: false,
  rate: 1,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};

export class AudioPlayer {
  private _WA = window.WA;
  private _audioPlayer: Sound | null;

  constructor() {
    this._audioPlayer = null;
  }

  public playMusic(music: MUSICS) {
    this._audioPlayer = this._WA.sound.loadSound(MusicDictionnary[music]);
    this._audioPlayer.play(config);
  }

  public stopMusic() {
    if (this._audioPlayer) {
      this._audioPlayer.stop();
    }
  }

  public playUnlockDoor() {
    try {
      const audio = this._WA.sound.loadSound(sound);
      audio.play(config);
    } catch (err) {
      console.log(err);
    }
  }

  public playLockDoor() {
    try {
      const audio = this._WA.sound.loadSound(sound);
      audio.play(config);
    } catch (err) {
      console.log(err);
    }
  }
}
