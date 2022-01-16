/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import BigNumber from "bignumber.js";
import Web3 from "web3";
import { useWeb3 } from "./use-web3";

//@ts-ignore
if (window.ethereum) {
  const WA = window.WA;
  let canEnterInPangolinRoom = false;

  let simpleWeb3: Web3;

  const { web3, pengFamilyContractERC720 } = useWeb3();
  simpleWeb3 = web3;
  try {
    simpleWeb3.eth
      .getAccounts()
      .then((accounts) => {
        WA.ui.registerMenuCommand("My peng team", {
          iframe: `src/iframes/my-nft-collection/myNftCollection.html?accounAddress=${accounts[0]}`,
          allowApi: true,
        });
        pengFamilyContractERC720.methods
          .tokensByAddress(accounts[0])
          .call()
          .then((result: any[]) => {
            result.forEach((nftId) => {
              console.log("nftId", nftId);
              if (nftId === "3337") {
                console.log("should unlock");
                canEnterInPangolinRoom = true;
              }
            });
          });
      })
      .catch((err: any) =>
        console.error("An error occured during the load of account.", err)
      );
    pengFamilyContractERC720.methods
      .totalSupply()
      .call()
      .then((totalSupply: number) =>
        WA.ui.registerMenuCommand("Pengdex", {
          iframe: `src/iframes/collection/collection.html?totalSupply=${totalSupply}`,
          allowApi: true,
        })
      )
      .catch((err: any) =>
        console.error("An error occured during the load of total supply.", err)
      );
    console.log("WEB 3 successfully loaded");
  } catch (err) {
    console.error(err);
  }

  // console.log(WA.room.onEnterLayer("metamask"));

  WA.room.onEnterLayer("metamask").subscribe(() => {
    simpleWeb3.eth
      .getAccounts()
      .then((accounts) => simpleWeb3.eth.getBalance(accounts[0]))
      .then((result) => {
        currentZone = "metamask_popup";
        WA.ui.openPopup(
          currentZone,
          `Hello ser, you currently have ${new BigNumber(result)
            .dividedBy(1000000000000000000)
            .toString()} AVAX on your account. Have a great day ser.`,
          [
            {
              label: "Close",
              className: "primary",
              callback: (popup) => {
                // Close the popup when the "Close" button is pressed.
                popup.close();
              },
            },
            {
              label: "Close",
              className: "primary",
              callback: (popup) => {
                // Close the popup when the "Close" button is pressed.
                popup.close();
              },
            },
          ]
        );
      });
  });

  WA.player.onPlayerMove((moveData) => {
    console.log(canEnterInPangolinRoom, moveData);
    if (canEnterInPangolinRoom) {
      console.log("test");
      WA.room.setTiles([{ x: 20, y: 15, tile: null, layer: "NftBlocker" }]);
    }
  });

  // WA.room.onEnterLayer("NftBlocker").subscribe(() => {
  //   WA.ui.openPopup("sorry_popup", "This is an imporant message!", [
  //     {
  //       label: "Got it!",
  //       className: "normal",
  //       callback: (popup) => {
  //         WA.controls.restorePlayerControls();
  //         popup.close();
  //       },
  //     },
  //   ]);
  // });

  // WA.room.onLeaveLayer("NftBlocker").subscribe(() => {
  //   isForbiden = false;
  // });

  let currentZone: string;
  let currentPopup: any;

  const config = [
    {
      zone: "needHelp",
      message: "Do you need some guidance? We are happy to help you out.",
      cta: [
        {
          label: "Meet us",
          className: "primary",
          callback: () =>
            WA.openTab(
              "https://play.staging.workadventu.re/@/tcm/workadventure/wa-village"
            ),
        },
      ],
    },
    {
      zone: "followUs",
      message: "Hey! Have you already started following us?",
      cta: [
        {
          label: "LinkedIn",
          className: "primary",
          callback: () =>
            WA.openTab("https://www.linkedin.com/company/workadventu-re"),
        },
        {
          label: "Twitter",
          className: "primary",
          callback: () => WA.openTab("https://twitter.com/workadventure_"),
        },
      ],
    },
  ];

  WA.onEnterZone("needHelp", () => {
    currentZone = "needHelp";
    openPopup(currentZone, currentZone + "Popup");
  });
  WA.onEnterZone("followUs", () => {
    currentZone = "followUs";
    openPopup(currentZone, currentZone + "Popup");
  });
  WA.room.onEnterLayer("needHelp").subscribe(closePopup);
  WA.onLeaveZone("followUs", closePopup);

  function openPopup(zoneName: string, popupName: string) {
    const zone = config.find((item) => {
      return item.zone == zoneName;
    });
    if (typeof zone !== "undefined") {
      // @ts-ignore otherwise we can't use zone.cta object
      currentPopup = WA.openPopup(popupName, zone.message, zone.cta);
    }
  }
  function closePopup() {
    if (typeof currentPopup !== undefined) {
      currentPopup.close();
      currentPopup = undefined;
    }
  }
  // let helloWorldPopup: any;

  // Open the popup when we enter a given zone
  // helloWorldPopup = WA.room.onEnterZone("metamask", () => {
  //   WA.ui.openPopup("popupRectangle", "Hello world!", [
  //     {
  //       label: "Close",
  //       className: "primary",
  //       callback: (popup) => {
  //         // Close the popup when the "Close" button is pressed.
  //         popup.close();
  //       },
  //     },
  //   ]);
  // });

  // Close the popup when we leave the zone.
  // WA.room.onLeaveZone("myZone", () => {
  //   helloWorldPopup.close();
  // });

  // https://play.workadventu.re/_/global/localhost:8080/map.json
  // https://play.workadventu.re/_/global/map.json
} else {
  console.error("An error occured during the load of web3");
}
