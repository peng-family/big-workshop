/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import BigNumber from "bignumber.js";
import Web3 from "web3";
import { useWeb3 } from "./use-web3";

console.log("Script started successfully");
console.log(window);
const WA = window.WA;
let web3: Web3;
//@ts-ignore
if (window.ethereum) {
  web3 = useWeb3();
}
console.log("bonjour", WA);

console.log(WA.room.onEnterLayer("metamask"));

WA.room.onEnterLayer("metamask").subscribe(() => {
  console.log(web3.eth);
  web3.eth
    .getAccounts()
    .then((accounts) => web3.eth.getBalance(accounts[0]))
    .then((result) => {
      currentZone = "metamask_popup";
      WA.ui.openPopup(
        currentZone,
        `Hello ser, you currently have ${new BigNumber(result).dividedBy(1000000000000000000).toString()} AVAX on your account. Have a great day ser.`,
        [
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
      console.log();
    });
});

console.log(WA.room.onEnterLayer);

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
