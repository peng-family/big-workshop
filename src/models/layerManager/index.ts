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
      this.watchTribeEntry(tribe);
    });
  };

  private hideTribeEntry = (tribe: Tribes) => {
    try {
      this._audioEffect.playLockDoor();
      this._WA.room.hideLayer(tribe);
      this._WA.room.showLayer(`${tribe}Blocker`);
      this._WA.room.showLayer(`${tribe} over player`);
    } catch (err) {
      console.log(err);
    }
  };

  private showTribeEntry = (tribe: Tribes) => {
    try {
      this._audioEffect.playUnlockDoor();
      this._WA.room.showLayer(tribe);
      this._WA.room.hideLayer(`${tribe}Blocker`);
      this._WA.room.hideLayer(`${tribe} over player`);
    } catch (err) {
      console.log(err);
    }
  };

  private watchTribeEntry = (tribe: Tribes) => {
    this._WA.room
      .onEnterLayer(tribe)
      .subscribe(() => this.showTribeEntry(tribe));
    this._WA.room
      .onLeaveLayer(tribe)
      .subscribe(() => this.hideTribeEntry(tribe));
  };
}
