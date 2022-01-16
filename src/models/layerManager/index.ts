import { AudioEffectPlayer } from "../audioPlayer";
import { Player } from "../player";
import { Tribes } from "../player/tribes";

export class LayerManager {
  private _WA = window.WA;
  private _player: Player;
  private _audioEffect: AudioEffectPlayer;

  constructor(player: Player) {
    this._player = player;
    this._audioEffect = new AudioEffectPlayer();
    this.initializeWatchers();
  }

  private initializeWatchers = () => {
    this._player.tribes.forEach((tribe) => {
      switch (tribe) {
        case Tribes.VOLCANO:
          this.watchVolcanoEntry();
          break;
        default:
          break;
      }
    });
  };

  private hideVolcanoLair = () => {
    try {
      this._audioEffect.playLockDoor();
      this._WA.room.hideLayer("volcano");
      this._WA.room.showLayer("volcanoBlocker");
    } catch (err) {
      console.log(err);
    }
  };

  private showVolcanoLair = () => {
    try {
      this._audioEffect.playUnlockDoor();
      this._WA.room.showLayer("volcano");
      this._WA.room.hideLayer("volcanoBlocker");
    } catch (err) {
      console.log(err);
    }
  };

  private watchVolcanoEntry = () => {
    console.log("start watch volcano");
    this._WA.room.onEnterLayer("volcano").subscribe(this.showVolcanoLair);
    this._WA.room.onLeaveLayer("volcano").subscribe(this.hideVolcanoLair);
  };
}
