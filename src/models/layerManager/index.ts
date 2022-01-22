import { AudioPlayer } from "../audioPlayer";
import { Player } from "../player";
import { Tribes } from "../player/tribes";

export class LayerManager {
  private _WA = window.WA;
  private _player: Player;
  private _audioEffect: AudioPlayer;

  constructor(player: Player) {
    this._player = player;
    this._audioEffect = new AudioPlayer();
    this.initializeWatchers();
  }

  private initializeWatchers = () => {
    this._player.tribes.forEach((tribe) => {
      this.watchTribeEntry(tribe);
    });
    this.watchBuildingEntry();
  };

  private watchBuildingEntry = () => {
    this._WA.room.onEnterLayer("hasRoof").subscribe(() => this.enterBuilding());
    this._WA.room.onLeaveLayer("hasRoof").subscribe(() => this.leaveBuilding());
  };

  private enterBuilding = () => {
    try {
      this._WA.room.hideLayer("roof");
    } catch (err) {
      console.log(err);
    }
  };

  private leaveBuilding = () => {
    try {
      this._WA.room.showLayer("roof");
    } catch (err) {
      console.log(err);
    }
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
