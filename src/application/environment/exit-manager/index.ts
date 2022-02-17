const WA = window.WA;
export const exitManager = () => {
  console.log("exit manager");
  WA.room.onEnterLayer("exit").subscribe(() => {
    WA.nav.goToRoom(
      "/@/avax-penguin-family/penguinverse/worldofpengs#door-opener/kalao"
    );
  });
};
