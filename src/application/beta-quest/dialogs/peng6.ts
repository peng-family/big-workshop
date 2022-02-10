import { IDialog } from "../dialogModels";
export const peng6Dialog: IDialog = {
  layerName: "peng6",
  stepName: "peng6",
  require: "peng5",
  sequence: [
    {
      rectangleName: "peng6Dialog",
      speech:
        "Welcome is the third Island of this PengVerse ! Here you will be able to discover the nice community we have on AVAX",
      answers: [
        { answer: "I need the 5th digit" },
        { answer: "I need a little bit of rest now", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "peng6Dialog",
      speech:
        "You mastered the DeFi and NFT Island but it will get harder and harder. When did the « Good bridging » community has been created ?",
      answers: [
        { answer: "To celebrate the ETH / AVAX bridge", close: true },
        { answer: "During a giveaway" },
        { answer: "During the AVAX ICO", close: true  },
        { answer: "Yesterday", close: true },
      ],
    },
    {
      rectangleName: "peng6Dialog",
      speech:
        "You know my community and I am happy to see that ! Here is the 5th digit, but I won’t give it to you, go check the sign on your right      Let’s do some math. Solve this and you have the number : (3+10)x0+2     You have it now ?",
      answers: [{ answer: "Got it Thanks !" }],
    },
  ],
  needPreviousStep: {
    rectangleName: "peng6Dialog",
    speech: "My fellow peng. You need to see the peng number 4 before me.",
    answers: [{ answer: "Peng peng ! Love u peng" }],
  },
  alreadySeen: {
    rectangleName: "peng6Dialog",
    speech:
      "My fellow peng. Go visit the Island",
    answers: [{ answer: "Peng peng ! Love u" }],
  },
};