export class Penguin {
  private _mintId: number;
  constructor(mintId: number) {
    this._mintId = mintId;
  }

  public get mintId() {
    return this._mintId;
  }
}
