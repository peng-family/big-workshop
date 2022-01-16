import sound from "../../assets/sound_effects/unlock_door.mp3";

const config = {
  volume: 0.5,
  loop: false,
  rate: 1,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};

export class AudioEffectPlayer {
  private _WA = window.WA;

  constructor() {}

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
