const WA = window.WA;

export const initializeDoors = async () => {
  try {
    const map = await WA.room.getTiledMap();
    const doorsLayer = map.layers.find((layer: any) => layer.name === "doors");
    const doorsList: string[] = doorsLayer.layers.map((d: any) => d.name);
    doorsList.forEach((door) => {
      WA.room
        .onEnterLayer(`door-opener/${door}`)
        .subscribe(() => WA.room.hideLayer(`doors/${door}`));
      WA.room
        .onLeaveLayer(`door-opener/${door}`)
        .subscribe(() => WA.room.showLayer(`doors/${door}`));
    });
  } catch (err) {
    console.log("error:", err);
  }
};
