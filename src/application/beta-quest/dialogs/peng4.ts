import { IDialog } from "../dialogModels";
export const peng4Dialog: IDialog = {
  layerName: "peng4",
  stepName: "peng4",
  require: "peng3",
  sequence: [
    {
      rectangleName: "peng4Dialog",
      speech:
        "Happy to see you on the NFT Island, ready for a new question about the ecosystem ?",
      answers: [
        { answer: "I am Peng !" },
        { answer: "I need to visit the Island first", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "peng4Dialog",
      speech:
        "Now is it time to ask some questions about NFTs, let’s go : When did Kalao launch its first product",
      answers: [
        { answer: "November 2020", close: true },
        { answer: "November 2021" },
        { answer: "October 2021", close: true  },
        { answer: "January 2022", close: true },
      ],
    },
    {
      rectangleName: "peng4Dialog",
      speech:
        "Hell yeah you know the NFT space ! You deserve to get the third digit of the code, that is exactly the number of letter in Kalao minus the number of letter in NFT, you have it ? Now you can meet my friend near the Ape tavern ",
      answers: [{ answer: "Got it Thanks !" }],
    },
  ],
  needPreviousStep: {
    rectangleName: "peng4Dialog",
    speech: "My fellow peng. You need to see the peng number 2 before me.",
    answers: [{ answer: "Peng peng ! Love u peng" }],
  },
  alreadySeen: {
    rectangleName: "peng4Dialog",
    speech:
      "My fellow peng. Go visit the Island",
    answers: [{ answer: "Peng peng ! Love u" }],
  },
};